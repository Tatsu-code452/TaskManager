use crate::{db::database::Database, model::task_actual_cell::TaskActualCell};

impl Database {
    pub fn add_task_actual_cell(&mut self, cell: TaskActualCell) {
        self.task_actual_cells.push(cell);
    }

    pub fn read_all_task_actual_cells(&self, task_id: &str) -> Vec<TaskActualCell> {
        self.task_actual_cells
            .iter()
            .filter(|c| c.task_id == task_id)
            .cloned()
            .collect()
    }

    pub fn find_task_actual_cell_mut(
        &mut self,
        task_id: &str,
        date: &str,
    ) -> Option<&mut TaskActualCell> {
        self.task_actual_cells
            .iter_mut()
            .find(|c| c.task_id == task_id && c.date == date)
    }

    pub fn delete_task_actual_cell(&mut self, task_id: &str, date: &str) {
        self.task_actual_cells
            .retain(|c| !(c.task_id == task_id && c.date == date));
    }
}
