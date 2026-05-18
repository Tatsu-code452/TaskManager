use crate::model::macro_model::model_with_default;
use crate::model::time_stamps::Timestamps;
use crate::model::utils::DefaultValue;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum ProjectStatus {
    Planned,   // 計画中
    Active,    // 進行中
    OnHold,    // 一時停止
    Completed, // 完了
    Archived,  // アーカイブ
    All,       // 検索用
}

impl DefaultValue for ProjectStatus {
    fn default_value() -> Self {
        ProjectStatus::Planned
    }
}

#[derive(Debug, Clone, serde::Deserialize)]
pub struct ProjectSearchCondition {
    pub id: Option<String>,
    pub name: Option<String>,
    pub client: Option<String>,
    pub description: Option<String>,
    pub status: Option<ProjectStatus>,
    pub start_date: Option<String>,
    pub end_date: Option<String>,
    pub owner: Option<String>,

    pub page: Option<usize>,
    pub limit: Option<usize>,
}

model_with_default!(
    Project,
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
    }
);
