use crate::db::database::Database;
use crate::define_crud;
use crate::model::project::Project;

impl Database {
    define_crud!(
        add_project,
        find_project,
        find_project_mut,
        find_all_project,
        update_project,
        delete_project,
        rebuild_project_index,
        projects,
        project_index,
        Project
    );

    pub fn delete_project_and_relation_data(&mut self, id: &str) {
        self.delete_project(id);

        // Project 直下のデータ削除
        self.phases.retain(|v| v.project_id != id);
        self.milestones.retain(|v| v.project_id != id);

        // 削除対象タスクの ID を先に集める
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

        // インデックス再構築
        self.rebuild_project_index();
        self.rebuild_phase_index();
        self.rebuild_milestone_index();
        self.rebuild_task_index();
        self.rebuild_issue_index();
        self.rebuild_defect_index();
    }
}
