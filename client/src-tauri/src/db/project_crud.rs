use crate::db::database::Database;
use crate::model::project::Project;

impl Database {
    pub fn add_project(&mut self, item: Project) -> Option<Project> {
        let id = item.id.clone();

        if self.project_index.contains_key(&id) {
            return None;
        }

        self.projects.push(item.clone());
        self.project_index.insert(id, self.projects.len() - 1);

        Some(item)
    }

    pub fn find_project(&self, id: &str) -> Option<&Project> {
        self.project_index
            .get(id)
            .and_then(|&i| self.projects.get(i))
    }

    pub fn find_project_mut(&mut self, id: &str) -> Option<&mut Project> {
        self.project_index
            .get(id)
            .and_then(|&i| self.projects.get_mut(i))
    }

    pub fn find_all_project(&self) -> Vec<Project> {
        self.projects.iter().cloned().collect()
    }

    pub fn update_project(&mut self, item: Project) -> Option<Project> {
        let id = item.id.clone();
        let index = *self.project_index.get(&id)?;
        self.projects[index] = item.clone();
        println!("crud OK");
        Some(item)
    }

    pub fn delete_project(&mut self, id: &str) -> Option<Project> {
        let index = *self.project_index.get(id)?;
        let removed = self.projects.remove(index);
        self.rebuild_project_index();
        Some(removed)
    }

    pub fn rebuild_project_index(&mut self) {
        self.project_index.clear();
        for (i, item) in self.projects.iter().enumerate() {
            self.project_index.insert(item.id.clone(), i);
        }
    }

    pub fn delete_project_with_relation(&mut self, id: &str) -> Option<Project> {
        // Project直下のデータ削除
        self.phases.retain(|v| v.project_id != id);
        self.milestones.retain(|v| v.project_id != id);

        // Projectに紐づく削除対象タスクの ID を先に集める
        let removed_task_ids: Vec<String> = self
            .tasks
            .iter()
            .filter(|t| t.project_id == id)
            .map(|t| t.id.clone())
            .collect();

        // タスク本体を削除
        self.tasks.retain(|t| t.project_id != id);

        // タスク関連データを削除
        for task_id in removed_task_ids {
            self.task_plan_cells.retain(|c| c.task_id != task_id);
            self.task_actual_cells.retain(|c| c.task_id != task_id);
            self.issues
                .retain(|i| i.task_id.as_deref() != Some(&task_id));
            self.defects
                .retain(|d| d.task_id.as_deref() != Some(&task_id));
        }

        // 最後にプロジェクト本体を削除
        let removed = self.delete_project(id);

        // インデックス再構築
        self.rebuild_phase_index();
        self.rebuild_milestone_index();
        self.rebuild_task_index();
        self.rebuild_issue_index();
        self.rebuild_defect_index();

        removed
    }
}
