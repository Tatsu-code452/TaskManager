use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum ProjectStatus {
    All,
    Planned,
    Active,
    Closed,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub client: String,
    pub status: ProjectStatus,
    pub start_date: String,
    pub end_date: String,
    pub timestamps: Timestamps,
}

#[derive(serde::Deserialize)]
pub struct ProjectRequest {
    pub id: String,
    pub name: Option<String>,
    pub client: Option<String>,
    pub status: Option<ProjectStatus>,
    pub start_date: Option<String>,
    pub end_date: Option<String>,
}

impl Project {
    pub fn new(id: String) -> Self {
        Self {
            id,
            name: "".into(),
            client: "".into(),
            status: ProjectStatus::Planned,
            start_date: "".into(),
            end_date: "".into(),
            timestamps: Timestamps::new(),
        }
    }
}
