use crate::db::database::Database;
use crate::define_crud;
use crate::model::task::Task;

define_crud!(
    add_task,
    find_task,
    find_task_mut,
    delete_task,
    tasks,
    task_index,
    Task
);

impl Database {
    pub fn find_task_by_project(&mut self, project_id: &str) -> Vec<Task> {
        self.tasks
            .iter()
            .filter(|t| t.project_id == project_id)
            .cloned()
            .collect()
    }

    pub fn find_task_by_phase(&mut self, phase_id: &str) -> Vec<Task> {
        self.tasks
            .iter()
            .filter(|t| t.phase_id == phase_id)
            .cloned()
            .collect()
    }

    pub fn find_task_by_id_and_project(&mut self, id: &str, project_id: &str) -> Option<Task> {
        self.tasks
            .iter()
            .find(|t| t.id == id && t.project_id == project_id)
            .cloned()
    }

    pub fn find_task_mut_by_id_and_project(
        &mut self,
        id: &str,
        project_id: &str,
    ) -> Option<&mut Task> {
        self.tasks
            .iter_mut()
            .find(|t| t.id == id && t.project_id == project_id)
    }

    pub fn delete_task_by_id_and_project(&mut self, id: &str, project_id: &str) -> Option<Task> {
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

        Some(removed)
    }
}
