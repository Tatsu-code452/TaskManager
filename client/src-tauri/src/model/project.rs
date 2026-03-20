use crate::define_model;
use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum ProjectStatus {
    Planned,   // 計画中
    Active,    // 進行中
    OnHold,    // 一時停止
    Completed, // 完了
    Archived,  // アーカイブ
}

define_model!(
    Project,
    ProjectRequest,
    ProjectRequest,
    { id: String },
    {
        name: String,
        client: String,
        description: String,
        status: ProjectStatus,
        start_date: Option<String>,
        end_date: Option<String>,
        owner: String,
    },
    {
        name: "".into(),
        client: "".into(),
        description: "".into(),
        status: ProjectStatus::Planned,
        start_date: None,
        end_date: None,
        owner: "".into(),
    }
);
