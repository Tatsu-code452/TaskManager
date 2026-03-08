use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum ProjectStatus {
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

impl Default for Project {
    fn default() -> Self {
        Self {
            id: "".into(),
            name: "".into(),
            client: "".into(),
            status: ProjectStatus::Planned,
            start_date: "".into(),
            end_date: "".into(),
            timestamps: Timestamps::new(),
        }
    }
}

impl Project {
    pub fn new(id: String) -> Self {
        Self {
            id,
            ..Default::default()
        }
    }
}
