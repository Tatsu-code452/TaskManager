use crate::{
    db::database::Database,
    domain::task_plan_cell::model::{TaskPlanCell, TaskPlanCellRequest},
};

pub struct TaskPlanCellService;

impl TaskPlanCellService {
    pub fn list(db: &Database, task_id: &str) -> Result<Vec<TaskPlanCell>, String> {
        if task_id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        db.find_all_task_plan_cell(&task_id)
            .ok_or_else(|| "Not found".to_string())
    }
    pub fn create(db: &mut Database, payload: TaskPlanCellRequest) -> Result<TaskPlanCell, String> {
        if payload.task_id.trim().is_empty() {
            return Err("Key is empty".into());
        }
        if payload.date.trim().is_empty() {
            return Err("Key is empty".into());
        }

        if db
            .find_task_plan_cell(&payload.task_id, &payload.date)
            .is_some()
        {
            return Err("Already exists".into());
        }

        let mut item = TaskPlanCell::default();
        item.task_id = payload.task_id.clone();
        item.date = payload.date.clone();
        item.hours = payload.hours.unwrap_or(0.0);

        db.add_task_plan_cell(item.clone())
            .ok_or_else(|| "Failed to add".to_string())?;

        db.save_atomic()?;
        Ok(item)
    }
    pub fn update(db: &mut Database, payload: TaskPlanCellRequest) -> Result<TaskPlanCell, String> {
        if payload.task_id.trim().is_empty() {
            return Err("Key is empty".into());
        }
        if payload.date.trim().is_empty() {
            return Err("Key is empty".into());
        }

        {
            let item = db
                .find_task_plan_cell_mut(&payload.task_id, &payload.date)
                .ok_or_else(|| "Not found".to_string())?;

            item.task_id = payload.task_id.clone();
            item.date = payload.date.clone();
            item.hours = payload.hours.unwrap_or(0.0);
            item.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_task_plan_cell(&payload.task_id, &payload.date)
            .unwrap()
            .clone())
    }
    pub fn delete(db: &mut Database, task_id: &str, date: &str) -> Result<(), String> {
        if task_id.trim().is_empty() {
            return Err("Key is empty".into());
        }
        if date.trim().is_empty() {
            return Err("Key is empty".into());
        }

        db.delete_task_plan_cell(task_id, date)
            .ok_or_else(|| "Not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }
}
