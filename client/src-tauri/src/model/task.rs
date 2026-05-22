use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

use crate::{
    db::table::HasKey,
    model::{macro_model::model_with_default, default_value::DefaultValue},
};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum TaskStatus {
    NotStarted,
    InProgress,
    Done,
}

impl DefaultValue for TaskStatus {
    fn default_value() -> Self {
        TaskStatus::NotStarted
    }
}

impl HasKey<(String, String)> for Task {
    fn key(&self) -> (String, String) {
        (self.project_id.clone(), self.id.clone())
    }
}

model_with_default!(
    Task,
    TaskRequest,
    {
        id: String,
        project_id: String,
    },
    {
        phase_id: String,
        name: String,
        planned_start: Option<String>,
        planned_end: Option<String>,
        planned_hours: Option<f64>,
        actual_start: Option<String>,
        actual_end: Option<String>,
        actual_hours: Option<f64>,
        progress_rate: f64,
        status: TaskStatus,
    }
);
