use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum MilestoneStatus {
    NotStarted,
    InProgress,
    Done,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Milestone {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub planned_start_date: String,
    pub planned_end_date: String,
    pub actual_start_date: Option<String>,
    pub actual_end_date: Option<String>,
    pub status: MilestoneStatus,
    pub timestamps: Timestamps,
}

impl Default for Milestone {
    fn default() -> Self {
        Self {
            id: "".into(),
            project_id: "".into(),
            name: "".into(),
            planned_start_date: "".into(),
            planned_end_date: "".into(),
            actual_start_date: None,
            actual_end_date: None,
            status: MilestoneStatus::NotStarted,
            timestamps: Timestamps::new(),
        }
    }
}

impl Milestone {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
            ..Default::default()
        }
    }
}
