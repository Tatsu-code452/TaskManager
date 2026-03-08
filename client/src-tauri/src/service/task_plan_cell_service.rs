use crate::db::database::Database;
use crate::model::task_plan_cell::TaskPlanCell;

pub struct TaskPlanCellService;

impl TaskPlanCellService {
    pub fn create(
        db: &mut Database,
        task_id: String,
        date: String,
        hours: f64,
    ) -> Result<TaskPlanCell, String> {
        let cell = TaskPlanCell {
            task_id,
            date,
            hours,
        };

        db.add_task_plan_cell(cell.clone());
        db.save_atomic()?;

        Ok(cell)
    }

    pub fn read_all(db: &Database, task_id: String) -> Vec<TaskPlanCell> {
        db.read_all_task_plan_cells(&task_id)
    }

    pub fn update(
        db: &mut Database,
        task_id: String,
        date: String,
        hours: Option<f64>,
    ) -> Result<TaskPlanCell, String> {
        {
            let cell = db
                .find_task_plan_cell_mut(&task_id, &date)
                .ok_or("Plan cell not found")?;

            if let Some(v) = hours {
                cell.hours = v;
            }
        }

        db.save_atomic()?;
        Ok(db.find_task_plan_cell_mut(&task_id, &date).unwrap().clone())
    }

    pub fn delete(db: &mut Database, task_id: String, date: String) -> Result<(), String> {
        db.delete_task_plan_cell(&task_id, &date);
        db.save_atomic()?;
        Ok(())
    }
}
