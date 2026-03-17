use crate::define_apply_request;
use crate::model::{tag::Tag, time_stamps::Timestamps};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum IssueStatus {
    Open,       // 登録しただけ
    InProgress, // 対応中
    Review,     // レビュー待ち
    Resolved,   // 対応完了（レビュー済み）
    Closed,     // 完全クローズ
}

#[derive(Serialize, Deserialize, Clone)]
pub enum IssuePriority {
    Low,
    Medium,
    High,
    Critical,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Issue {
    pub id: String,
    pub project_id: String,
    pub task_id: Option<String>,

    pub title: String,
    pub description: String,

    // 状態管理
    pub status: IssueStatus,
    pub priority: IssuePriority,

    // 担当者
    pub owner: String,    // 対応者
    pub reviewer: String, // チェック担当

    // スケジュール
    pub due_date: Option<String>,       // 期限
    pub completed_date: Option<String>, // 完了日（実績）

    // タグ（フィルタ用）
    pub tags: Vec<Tag>,

    pub timestamps: Timestamps,
}

#[derive(Deserialize)]
pub struct IssueRequest {
    pub id: String,
    pub project_id: String,
    pub task_id: Option<Option<String>>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub status: Option<IssueStatus>,
    pub priority: Option<IssuePriority>,
    pub owner: Option<String>,
    pub reviewer: Option<String>,
    pub due_date: Option<Option<String>>,
    pub completed_date: Option<Option<String>>,
    pub tags: Option<Vec<Tag>>,
}

impl Issue {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
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
            timestamps: Timestamps::new(),
        }
    }

    define_apply_request!(
        IssueRequest,
        task_id,
        title,
        description,
        status,
        priority,
        owner,
        reviewer,
        due_date,
        completed_date,
        tags
    );
}
