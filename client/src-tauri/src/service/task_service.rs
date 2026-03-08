use crate::db::database::Database;
use crate::model::task::{Task, TaskStatus};
use crate::model::time_stamps::Timestamps;
use crate::util::id::generate_uuid;

pub struct TaskService;

impl TaskService {
    pub fn create(
        db: &mut Database,
        project_id: String,
        phase_id: String,
        name: String,
        planned_start: String,
        planned_end: String,
        actual_start: Option<String>,
        actual_end: Option<String>,
        planned_hours: f64,
        actual_hours: f64,
        progress_rate: f64,
        status: TaskStatus,
    ) -> Result<Task, String> {
        let task = Task {
            id: generate_uuid(),
            project_id,
            phase_id,
            name,
            planned_start,
            planned_end,
            actual_start,
            actual_end,
            planned_hours,
            actual_hours,
            progress_rate,
            status,
            timestamps: Timestamps::new(),
        };

        db.add_task(task.clone());
        db.save_atomic()?;

        Ok(task)
    }

    pub fn update(
        db: &mut Database,
        id: String,
        project_id: Option<String>,
        phase_id: Option<String>,
        name: Option<String>,
        planned_start: Option<String>,
        planned_end: Option<String>,
        actual_start: Option<String>,
        actual_end: Option<String>,
        planned_hours: Option<f64>,
        actual_hours: Option<f64>,
        progress_rate: Option<f64>,
        status: Option<TaskStatus>,
    ) -> Result<Task, String> {
        {
            let task = db.find_task_mut(&id).ok_or("Task not found")?;

            if let Some(v) = project_id {
                task.project_id = v;
            }
            if let Some(v) = phase_id {
                task.phase_id = v;
            }
            if let Some(v) = name {
                task.name = v;
            }
            if let Some(v) = planned_start {
                task.planned_start = v;
            }
            if let Some(v) = planned_end {
                task.planned_end = v;
            }
            if let Some(v) = actual_start {
                task.actual_start = Some(v);
            }
            if let Some(v) = actual_end {
                task.actual_end = Some(v);
            }
            if let Some(v) = planned_hours {
                task.planned_hours = v;
            }
            if let Some(v) = actual_hours {
                task.actual_hours = v;
            }
            if let Some(v) = progress_rate {
                task.progress_rate = v;
            }
            if let Some(v) = status {
                task.status = v;
            }

            task.timestamps.touch();
        }

        db.save_atomic()?;
        Ok(db.find_task(&id).unwrap().clone())
    }

    pub fn delete(db: &mut Database, id: String) -> Result<(), String> {
        db.delete_task(&id);
        db.save_atomic()?;
        Ok(())
    }
}
