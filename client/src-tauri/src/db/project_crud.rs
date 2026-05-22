use crate::db::database::Database;
use crate::db::table::{add, all, delete, find, find_mut, rebuild_index, update};
use crate::model::project::Project;

impl Database {
    pub fn add_project(&mut self, row: Project) -> Option<Project> {
        add(&mut self.projects, &mut self.project_index, row.clone())
    }

    pub fn update_project(&mut self, row: Project) -> Option<Project> {
        update(&mut self.projects, &mut self.project_index, row.clone())
    }

    pub fn delete_project(&mut self, id: &str) -> Option<Project> {
        delete(&mut self.projects, &mut self.project_index, id.to_string())
    }

    pub fn find_project(&self, id: &str) -> Option<&Project> {
        find(&self.projects, &self.project_index, id.to_string())
    }

    pub fn find_project_mut(&mut self, id: &str) -> Option<&mut Project> {
        find_mut(&mut self.projects, &self.project_index, id.to_string())
    }

    pub fn find_all_project(&self) -> Vec<Project> {
        all(&self.projects)
    }

    pub fn rebuild_project_index(&mut self) {
        rebuild_index(&mut self.projects, &mut self.project_index)
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
