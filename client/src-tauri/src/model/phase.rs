use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Phase {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub order: u32,
    pub inputs: Vec<String>,
    pub outputs: Vec<String>,
    pub timestamps: Timestamps,
}

impl Default for Phase {
    fn default() -> Self {
        Self {
            id: "".into(),
            project_id: "".into(),
            name: "".into(),
            order: 1,
            inputs: vec![],
            outputs: vec![],
            timestamps: Timestamps::new(),
        }
    }
}

impl Phase {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
            ..Default::default()
        }
    }
}
