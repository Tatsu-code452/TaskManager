use crate::define_model;
use crate::model::tag::Tag;
use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

pub const MILESTONE_TEMPLATE: &[(&str, usize)] = &[
    ("要件定義", 1),
    ("基本設計", 2),
    ("詳細設計", 3),
    ("製造/単体テスト", 4),
    ("結合テスト", 5),
    ("システムテスト", 6),
    ("受入テスト", 7),
    ("納品", 8),
];

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum MilestoneStatus {
    Open,       // 作成
    InProgress, // 進行中
    Completed,  // 完了
    Archived,   // アーカイブ
}

define_model!(
    Milestone,
    MilestoneRequest,
    MilestoneRequest,
    {
        id: String,
        project_id: String,
    },
    {
        title: String,
        description: String,
        // 状態管理
        status: MilestoneStatus,
        progress: u8, // 0〜100%
        // スケジュール
        start_date: Option<String>,
        end_date: Option<String>,
        // 担当者
        owner: String,
        // タグ
        tags: Vec<Tag>,
    },
    {
        title: "".into(),
        description: "".into(),
        status: MilestoneStatus::Open,
        progress: 0,
        start_date: None,
        end_date: None,
        owner: "".into(),
        tags: vec![],
    }
);
