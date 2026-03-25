use crate::model::time_stamps::Timestamps;
use crate::util::id::generate_uuid;
use crate::{define_apply_request, define_model};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum TaskStatus {
    NotStarted,
    InProgress,
    Done,
}

define_model!(
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

impl Task {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id: generate_uuid(),
            project_id,
            phase_id: "".into(),
            name: "".into(),
            planned_start: None,
            planned_end: None,
            planned_hours: None,
            actual_start: None,
            actual_end: None,
            actual_hours: None,
            progress_rate: 0.0,
            status: TaskStatus::NotStarted,
            timestamps: Timestamps::new(),
        }
    }
}

define_apply_request!(
    Task,
    TaskRequest,
    {
        phase_id,
        name,
        planned_start,
        planned_end,
        planned_hours,
        actual_start,
        actual_end,
        actual_hours,
        progress_rate,
        status,
    }
);
