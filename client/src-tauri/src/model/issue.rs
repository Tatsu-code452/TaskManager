use crate::define_model_all;
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

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum IssuePriority {
    Low,
    Medium,
    High,
    Critical,
}

define_model_all!(
    Issue,
    IssueRequest,
    IssueRequest,
    {
        id: String,
        project_id: String,
    },
    {
        task_id: Option<String> => None,
        title: String => "".into(),
        description: String => "".into(),
        status: IssueStatus => IssueStatus::Open,
        priority: IssuePriority => IssuePriority::Low,
        owner: String => "".into(),
        reviewer: String => "".into(),
        due_date: Option<String> => None,
        completed_date: Option<String> => None,
        tags: Vec<Tag> => vec![],
    }
);
