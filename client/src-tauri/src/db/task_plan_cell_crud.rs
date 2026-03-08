use crate::{db::database::Database, model::task_plan_cell::TaskPlanCell};

impl Database {
    pub fn add_task_plan_cell(&mut self, cell: TaskPlanCell) {
        self.task_plan_cells.push(cell);
    }

    pub fn read_all_task_plan_cells(&self, task_id: &str) -> Vec<TaskPlanCell> {
        self.task_plan_cells
            .iter()
            .filter(|c| c.task_id == task_id)
            .cloned()
            .collect()
    }

    pub fn find_task_plan_cell_mut(
        &mut self,
        task_id: &str,
        date: &str,
    ) -> Option<&mut TaskPlanCell> {
        self.task_plan_cells
            .iter_mut()
            .find(|c| c.task_id == task_id && c.date == date)
    }

    pub fn delete_task_plan_cell(&mut self, task_id: &str, date: &str) {
        self.task_plan_cells
            .retain(|c| !(c.task_id == task_id && c.date == date));
    }
}
