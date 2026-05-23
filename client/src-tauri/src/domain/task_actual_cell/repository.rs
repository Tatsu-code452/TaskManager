use crate::{db::database::Database, domain::task_actual_cell::model::TaskActualCell};

impl Database {
    pub fn add_task_actual_cell(&mut self, item: TaskActualCell) -> Option<TaskActualCell> {
        self.task_actual_cells.push(item.clone());
        Some(item)
    }
    pub fn update_task_actual_cell(&mut self, item: TaskActualCell) -> Option<TaskActualCell> {
        let pos = self
            .task_actual_cells
            .iter()
            .position(|v| v.task_id == item.task_id && v.date == item.date)?;

        self.task_actual_cells[pos] = item.clone();
        Some(item)
    }
    pub fn delete_task_actual_cell(&mut self, task_id: &str, date: &str) -> Option<TaskActualCell> {
        let pos = self
            .task_actual_cells
            .iter()
            .position(|v| v.task_id == task_id && v.date == date)?;
        let removed = self.task_actual_cells.remove(pos);
        Some(removed)
    }

    pub fn find_task_actual_cell(&self, task_id: &str, date: &str) -> Option<&TaskActualCell> {
        self.task_actual_cells
            .iter()
            .find(|v| v.task_id == task_id && v.date == date)
    }
    pub fn find_task_actual_cell_mut(
        &mut self,
        task_id: &str,
        date: &str,
    ) -> Option<&mut TaskActualCell> {
        self.task_actual_cells
            .iter_mut()
            .find(|v| v.task_id == task_id && v.date == date)
    }
    pub fn find_all_task_actual_cell(&self, key1_val: &str) -> Option<Vec<TaskActualCell>> {
        let list: Vec<TaskActualCell> = self
            .task_actual_cells
            .iter()
            .filter(|v| v.task_id == key1_val)
            .cloned()
            .collect();

        if list.is_empty() {
            None
        } else {
            Some(list)
        }
    }
}
