use crate::db::table::HasKey;
use crate::model::default_value::DefaultValue;
use crate::model::macro_model::model_with_default;
use crate::model::tag::Tag;
use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum IssueStatus {
    Open,       // 登録しただけ
    InProgress, // 対応中
    Review,     // レビュー待ち
    Resolved,   // 対応完了（レビュー済み）
    Closed,     // 完全クローズ
}

impl DefaultValue for IssueStatus {
    fn default_value() -> Self {
        IssueStatus::Open
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum IssuePriority {
    Low,
    Medium,
    High,
    Critical,
}

impl DefaultValue for IssuePriority {
    fn default_value() -> Self {
        IssuePriority::Low
    }
}

impl HasKey<(String, String)> for Issue {
    fn key(&self) -> (String, String) {
        (self.project_id.clone(), self.id.clone())
    }
}

model_with_default!(
    Issue,
    IssueRequest,
    {
        id: String,
        project_id: String,
    },
    {
        task_id: Option<String>,
        title: String,
        description: String,
        status: IssueStatus,
        priority: IssuePriority,
        owner: String,
        reviewer: String,
        due_date: Option<String>,
        completed_date: Option<String>,
        tags: Vec<Tag>,
    }
);
