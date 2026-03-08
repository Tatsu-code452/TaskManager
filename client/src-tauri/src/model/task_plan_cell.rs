use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct TaskPlanCell {
    pub task_id: String,
    pub date: String,
    pub hours: f64,
}

impl Default for TaskPlanCell {
    fn default() -> Self {
        Self {
            task_id: "".into(),
            date: "".into(),
            hours: 0.0,
        }
    }
}

impl TaskPlanCell {
    pub fn new(task_id: String, date: String) -> Self {
        Self {
            task_id,
            date,
            ..Default::default()
        }
    }
}
