use crate::db::database::Database;
use crate::define_crud_multiple_id;
use crate::model::task::Task;

impl Database {
    define_crud_multiple_id!(
        add_task,
        update_task,
        delete_task,
        find_task,
        find_task_mut,
        find_task_by_project,
        next_task_id,
        rebuild_task_index,
        tasks,
        task_index,
        row,
        Task,
        project_id,
        id,
        "TASK-"
    );

    pub fn find_task_by_task(&mut self, task_id: &str) -> Vec<Task> {
        self.tasks
            .iter()
            .filter(|t| t.id == task_id)
            .cloned()
            .collect()
    }
    pub fn delete_task_and_relate_data(&mut self, id: &str, project_id: &str) -> Option<Task> {
        let index = self
            .tasks
            .iter()
            .position(|t| t.id == id && t.project_id == project_id)?;

        let removed = self.tasks.remove(index);

        // Task に紐づく関連データも削除
        self.task_plan_cells.retain(|c| c.task_id != id);
        self.task_actual_cells.retain(|c| c.task_id != id);
        self.issues.retain(|i| i.task_id.as_deref() != Some(id));
        self.defects.retain(|d| d.task_id.as_deref() != Some(id));

        self.rebuild_task_index();
        self.rebuild_issue_index();
        self.rebuild_defect_index();

        Some(removed)
    }
}
