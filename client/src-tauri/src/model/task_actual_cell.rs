use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct TaskActualCell {
    pub task_id: String,
    pub date: String,
    pub hours: f64,
}

#[derive(serde::Deserialize)]
pub struct TaskActualCellRequest {
    pub task_id: String,
    pub date: String,
    pub hours: f64,
}

impl Default for TaskActualCell {
    fn default() -> Self {
        Self {
            task_id: "".into(),
            date: "".into(),
            hours: 0.0,
        }
    }
}

impl TaskActualCell {
    pub fn new(task_id: String, date: String) -> Self {
        Self {
            task_id,
            date,
            ..Default::default()
        }
    }
}
