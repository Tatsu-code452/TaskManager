use crate::db::database::Database;
use crate::model::task::{Task, TaskRequest};

pub struct TaskService;

impl TaskService {
    pub fn create(db: &mut Database, payload: TaskRequest) -> Result<Task, String> {
        let mut task = Task::new();

        task.id = payload.id;
        task.project_id = payload.project_id;

        payload.phase_id.map(|v| task.phase_id = v);
        payload.name.map(|v| task.name = v);
        payload.planned_start.map(|v| task.planned_start = v);
        payload.planned_end.map(|v| task.planned_end = v);
        payload.actual_start.map(|v| task.actual_start = v);
        payload.actual_end.map(|v| task.actual_end = v);
        payload.planned_hours.map(|v| task.planned_hours = v);
        payload.actual_hours.map(|v| task.actual_hours = v);
        payload.progress_rate.map(|v| task.progress_rate = v);
        payload.status.map(|v| task.status = v);

        db.add_task(task.clone());
        db.save_atomic()?;

        Ok(task)
    }

    pub fn update(db: &mut Database, payload: TaskRequest) -> Result<Task, String> {
        {
            let task = db
                .find_task_mut_by_id_and_project(&payload.id, &payload.project_id)
                .ok_or_else(|| "Phase not found".to_string())?;

            payload.phase_id.map(|v| task.phase_id = v);
            payload.name.map(|v| task.name = v);
            payload.planned_start.map(|v| task.planned_start = v);
            payload.planned_end.map(|v| task.planned_end = v);
            payload.actual_start.map(|v| task.actual_start = v);
            payload.actual_end.map(|v| task.actual_end = v);
            payload.planned_hours.map(|v| task.planned_hours = v);
            payload.actual_hours.map(|v| task.actual_hours = v);
            payload.progress_rate.map(|v| task.progress_rate = v);
            payload.status.map(|v| task.status = v);

            task.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_task_by_id_and_project(&payload.id, &payload.project_id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_task(&id);
        db.save_atomic()?;
        Ok(())
    }
}
