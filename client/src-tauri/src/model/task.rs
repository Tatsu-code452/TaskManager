use crate::define_model;
use crate::model::time_stamps::Timestamps;
use crate::util::id::generate_uuid;
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
        progress_rate: f64, // 自動計算用（入力ではなく内部管理）
        status: TaskStatus,
    },
    {
        phase_id: "".into(),
        name: "".into(),
        planned_start: None,
        planned_end: None,
        actual_start: None,
        actual_end: None,
        planned_hours: None,
        actual_hours: None,
        progress_rate: 0.0,
        status: TaskStatus::NotStarted,
    }
);

pub fn set_keys(task: Task, project_id: String, phase_id: String) -> Task {
    Task {
        id: generate_uuid(),
        project_id,
        phase_id,
        ..task
    }
}
