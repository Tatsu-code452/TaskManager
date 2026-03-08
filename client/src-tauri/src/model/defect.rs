use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum DefectSeverity {
    Minor,
    Major,
    Critical,
}

#[derive(Serialize, Deserialize, Clone)]
pub enum DefectStatus {
    Open,
    Fixed,
    Closed,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Defect {
    pub id: String,
    pub project_id: String,
    pub task_id: Option<String>,
    pub title: String,
    pub description: String,
    pub severity: DefectSeverity,
    pub status: DefectStatus,
    pub timestamps: Timestamps,
}

impl Default for Defect {
    fn default() -> Self {
        Self {
            id: "".into(),
            project_id: "".into(),
            task_id: Some("".into()),
            title: "".into(),
            description: "".into(),
            severity: DefectSeverity::Minor,
            status: DefectStatus::Open,
            timestamps: Timestamps::new(),
        }
    }
}

impl Defect {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
            ..Default::default()
        }
    }
}
