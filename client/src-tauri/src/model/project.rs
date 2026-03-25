use crate::define_model_all;
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

define_model_all!(
    Project,
    ProjectRequest,
    ProjectRequest,
    { id: String },
    {
        name: String => "".into(),
        client: String => "".into(),
        description: String => "".into(),
        status: ProjectStatus => ProjectStatus::Planned,
        start_date: Option<String> => None,
        end_date: Option<String> => None,
        owner: String => "".into(),
    }
);
