use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum IssueStatus {
    Open,
    InProgress,
    Resolved,
    Closed,
}

#[derive(Serialize, Deserialize, Clone)]
pub enum IssuePriority {
    Low,
    Medium,
    High,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Issue {
    pub id: String,
    pub project_id: String,
    pub task_id: Option<String>,
    pub title: String,
    pub description: String,
    pub status: IssueStatus,
    pub priority: IssuePriority,
    pub owner: String,
    pub timestamps: Timestamps,
}

impl Default for Issue {
    fn default() -> Self {
        Self {
            id: "".into(),
            project_id: "".into(),
            task_id: Some("".into()),
            title: "".into(),
            description: "".into(),
            status: IssueStatus::Open,
            priority: IssuePriority::Low,
            owner: "".into(),
            timestamps: Timestamps::new(),
        }
    }
}

impl Issue {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
            ..Default::default()
        }
    }
}
