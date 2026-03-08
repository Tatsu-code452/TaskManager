use crate::db::database::Database;
use crate::db::delete_basic::delete_basic;
use crate::define_crud;
use crate::model::task::Task;

define_crud!(
    add_task,
    find_task,
    find_task_mut,
    _delete_task,
    tasks,
    task_index,
    Task
);

impl Database {
    pub fn delete_task(&mut self, id: &str) {
        if delete_basic(&mut self.tasks, &mut self.task_index, id) {
            self.rebuild_indexes();
        }
        self.task_plan_cells.retain(|c| c.task_id != id);
        self.task_actual_cells.retain(|c| c.task_id != id);
        self.issues.retain(|i| i.task_id.as_deref() != Some(id));
        self.defects.retain(|d| d.task_id.as_deref() != Some(id));
        self.rebuild_indexes();
    }

    pub fn read_all_tasks_by_phase(&self, phase_id: &str) -> Vec<Task> {
        self.tasks
            .iter()
            .filter(|t| t.phase_id == phase_id)
            .cloned()
            .collect()
    }
}
