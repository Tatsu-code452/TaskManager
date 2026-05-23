use crate::{
    db::table::HasKey,
    model::{
        default_value::DefaultValue, macro_model::model_with_default, time_stamps::Timestamps,
    },
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum PhaseStatus {
    NotStarted,
    InProgress,
    Completed,
}

impl DefaultValue for PhaseStatus {
    fn default_value() -> Self {
        PhaseStatus::NotStarted
    }
}

impl HasKey<(String, String)> for Phase {
    fn key(&self) -> (String, String) {
        (self.project_id.clone(), self.id.clone())
    }
}

model_with_default!(
    Phase,
    PhaseRequest,
    {
        id: String,
        project_id: String,
    },
    {
        name: String,
        order: u32,
        status: PhaseStatus,
        start_date: Option<String>,
        end_date: Option<String>,
        inputs: Vec<String>,
        outputs: Vec<String>,
        owner: String,
    }
);
