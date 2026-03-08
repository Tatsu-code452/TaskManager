use crate::db::database::Database;
use crate::model::task_actual_cell::TaskActualCell;

pub struct TaskActualCellService;

impl TaskActualCellService {
    pub fn create(
        db: &mut Database,
        task_id: String,
        date: String,
        hours: f64,
    ) -> Result<TaskActualCell, String> {
        let cell = TaskActualCell {
            task_id,
            date,
            hours,
        };

        db.add_task_actual_cell(cell.clone());
        db.save_atomic()?;

        Ok(cell)
    }

    pub fn read_all(db: &Database, task_id: String) -> Vec<TaskActualCell> {
        db.read_all_task_actual_cells(&task_id)
    }

    pub fn update(
        db: &mut Database,
        task_id: String,
        date: String,
        hours: Option<f64>,
    ) -> Result<TaskActualCell, String> {
        {
            let cell = db
                .find_task_actual_cell_mut(&task_id, &date)
                .ok_or("Actual cell not found")?;

            if let Some(v) = hours {
                cell.hours = v;
            }
        }

        db.save_atomic()?;
        Ok(db.find_task_actual_cell_mut(&task_id, &date).unwrap().clone())
    }

    pub fn delete(db: &mut Database, task_id: String, date: String) -> Result<(), String> {
        db.delete_task_actual_cell(&task_id, &date);
        db.save_atomic()?;
        Ok(())
    }
}
