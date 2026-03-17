use crate::model::{tag::Tag, time_stamps::Timestamps};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum DefectSeverity {
    Minor,    // 軽微
    Major,    // 重要
    Critical, // 致命的
    Blocker,  // 作業不能
}

#[derive(Serialize, Deserialize, Clone)]
pub enum DefectStatus {
    Open,       // 登録
    InProgress, // 修正中
    Fixed,      // 修正完了
    Verified,   // 確認完了
    Closed,     // 完全クローズ
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Defect {
    pub id: String,
    pub project_id: String,
    pub task_id: Option<String>,

    pub title: String,
    pub description: String,

    // 状態管理
    pub severity: DefectSeverity,
    pub status: DefectStatus,

    // 担当者
    pub owner: String,    // 修正担当
    pub reviewer: String, // 確認担当

    // スケジュール
    pub due_date: Option<String>,      // 修正期限
    pub fixed_date: Option<String>,    // 修正完了日
    pub verified_date: Option<String>, // 確認完了日

    // タグ（フィルタ用）
    pub tags: Vec<Tag>,

    pub timestamps: Timestamps,
}

#[derive(Deserialize)]
pub struct DefectRequest {
    pub id: String,
    pub project_id: String,

    pub task_id: Option<Option<String>>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub severity: Option<DefectSeverity>,
    pub status: Option<DefectStatus>,
    pub owner: Option<String>,
    pub reviewer: Option<String>,
    pub due_date: Option<Option<String>>,
    pub fixed_date: Option<Option<String>>,
    pub verified_date: Option<Option<String>>,
    pub tags: Option<Vec<Tag>>,
}

impl Defect {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
            task_id: None,
            title: "".into(),
            description: "".into(),
            severity: DefectSeverity::Minor,
            status: DefectStatus::Open,
            owner: "".into(),
            reviewer: "".into(),
            due_date: None,
            fixed_date: None,
            verified_date: None,
            tags: vec![],
            timestamps: Timestamps::new(),
        }
    }

    define_apply_request!(
        DefectRequest,
        task_id,
        title,
        description,
        severity,
        status,
        owner,
        reviewer,
        due_date,
        fixed_date,
        verified_date,
        tags
    );
}
