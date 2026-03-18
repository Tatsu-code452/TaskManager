use crate::define_model;
use crate::model::tag::Tag;
use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "PascalCase")]
enum IssueStatus {
    Open,       // 登録しただけ
    InProgress, // 対応中
    Review,     // レビュー待ち
    Resolved,   // 対応完了（レビュー済み）
    Closed,     // 完全クローズ
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "PascalCase")]
enum IssuePriority {
    Low,
    Medium,
    High,
    Critical,
}

define_model!(
    Issue,
    IssueRequest,
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
    },
    {
        task_id: None,
        title: "".into(),
        description: "".into(),
        status: IssueStatus::Open,
        priority: IssuePriority::Low,
        owner: "".into(),
        reviewer: "".into(),
        due_date: None,
        completed_date: None,
        tags: vec![],
    }
);
