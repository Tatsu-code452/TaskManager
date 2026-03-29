use crate::define_model_all;
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

define_model_all!(
    Milestone,
    MilestoneRequest,
    MilestoneRequest,
    {
        id: String,
        project_id: String,
    },
    {
        title: String => "".into(),
        description: String => "".into(),
        status: MilestoneStatus => MilestoneStatus::Open,
        progress: u8 => 0,
        start_date: Option<String> => None,
        end_date: Option<String> => None,
        owner: String => "".into(),
    }
);
