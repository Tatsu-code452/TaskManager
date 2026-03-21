use crate::define_model;
use crate::model::tag::Tag;
use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum DefectSeverity {
    Minor,    // 軽微
    Major,    // 重要
    Critical, // 致命的
    Blocker,  // 作業不能
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum DefectStatus {
    Open,       // 登録
    InProgress, // 修正中
    Fixed,      // 修正完了
    Verified,   // 確認完了
    Closed,     // 完全クローズ
}

define_model!(
    Defect,
    DefectRequest,
    DefectRequest,
    {
        id: String,
        project_id: String,
    },
    {
        task_id: Option<String>,
        title: String,
        description: String,
        // 状態管理
        severity: DefectSeverity,
        status: DefectStatus,
        // 担当者
        owner: String,    // 修正担当
        reviewer: String, // 確認担当
        // スケジュール
        due_date: Option<String>,      // 修正期限
        fixed_date: Option<String>,    // 修正完了日
        verified_date: Option<String>, // 確認完了日
        // タグ（フィルタ用）
        tags: Vec<Tag>,
    },
    {
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
    }
);
