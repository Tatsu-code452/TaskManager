use crate::model::time_stamps::Timestamps;
use crate::util::id::generate_uuid;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum TaskStatus {
    NotStarted,
    InProgress,
    Done,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Task {
    pub id: String,
    pub project_id: String,
    pub phase_id: String,
    pub name: String,

    pub planned_start: String,
    pub planned_end: String,
    pub actual_start: Option<String>,
    pub actual_end: Option<String>,

    pub planned_hours: f64,
    pub actual_hours: f64,
    pub progress_rate: f64,

    pub status: TaskStatus,
    pub timestamps: Timestamps,
}

impl Default for Task {
    fn default() -> Self {
        Self {
            id: generate_uuid(),
            project_id: "".into(),
            phase_id: "".into(),
            name: "".into(),
            planned_start: "".into(),
            planned_end: "".into(),
            actual_start: None,
            actual_end: None,
            planned_hours: 0.0,
            actual_hours: 0.0,
            progress_rate: 0.0,
            status: TaskStatus::NotStarted,
            timestamps: Timestamps::new(),
        }
    }
}

impl Task {
    pub fn new() -> Self {
        Self::default()
    }
}
