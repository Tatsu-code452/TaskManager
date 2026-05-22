use crate::{db::database::Database, model::task_plan_cell::TaskPlanCell};

impl Database {
    pub fn add_task_plan_cell(&mut self, item: TaskPlanCell) -> Option<TaskPlanCell> {
        self.task_plan_cells.push(item.clone());
        Some(item)
    }
    pub fn update_task_plan_cell(&mut self, item: TaskPlanCell) -> Option<TaskPlanCell> {
        let pos = self
            .task_plan_cells
            .iter()
            .position(|v| v.task_id == item.task_id && v.date == item.date)?;

        self.task_plan_cells[pos] = item.clone();
        Some(item)
    }
    pub fn delete_task_plan_cell(&mut self, task_id: &str, date: &str) -> Option<TaskPlanCell> {
        let pos = self
            .task_plan_cells
            .iter()
            .position(|v| v.task_id == task_id && v.date == date)?;
        let removed = self.task_plan_cells.remove(pos);
        Some(removed)
    }

    pub fn find_task_plan_cell(&self, task_id: &str, date: &str) -> Option<&TaskPlanCell> {
        self.task_plan_cells
            .iter()
            .find(|v| v.task_id == task_id && v.date == date)
    }
    pub fn find_task_plan_cell_mut(
        &mut self,
        task_id: &str,
        date: &str,
    ) -> Option<&mut TaskPlanCell> {
        self.task_plan_cells
            .iter_mut()
            .find(|v| v.task_id == task_id && v.date == date)
    }
    pub fn find_all_task_plan_cell(&self, key1_val: &str) -> Option<Vec<TaskPlanCell>> {
        let list: Vec<TaskPlanCell> = self
            .task_plan_cells
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
