use crate::{
    db::table::HasKey,
    model::{
        default_value::DefaultValue, macro_model::model_with_default, time_stamps::Timestamps,
    },
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum MilestoneStatus {
    Open,       // 作成
    InProgress, // 進行中
    Completed,  // 完了
    Archived,   // アーカイブ
}

impl DefaultValue for MilestoneStatus {
    fn default_value() -> Self {
        MilestoneStatus::Open
    }
}

impl HasKey<(String, String)> for Milestone {
    fn key(&self) -> (String, String) {
        (self.project_id.clone(), self.id.clone())
    }
}

model_with_default!(
    Milestone,
    MilestoneRequest,
     {
        id: String,
        project_id: String,
    },
    {
        title: String,
        description: String,
        status: MilestoneStatus,
        progress: u8,
        start_date: Option<String>,
        end_date: Option<String>,
        owner: String,
    }
);
