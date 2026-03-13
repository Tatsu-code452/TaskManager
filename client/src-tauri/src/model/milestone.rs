use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum MilestoneStatus {
    NotStarted,
    InProgress,
    Done,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Milestone {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub planned_start_date: String,
    pub planned_end_date: String,
    pub actual_start_date: String,
    pub actual_end_date: String,
    pub status: MilestoneStatus,
    pub timestamps: Timestamps,
}

#[derive(serde::Deserialize)]
pub struct MilestoneRequest {
    pub id: String,
    pub project_id: String,
    pub name: Option<String>,
    pub planned_start_date: Option<String>,
    pub planned_end_date: Option<String>,
    pub actual_start_date: Option<String>,
    pub actual_end_date: Option<String>,
    pub status: Option<MilestoneStatus>,
}

impl Milestone {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
            name: "".into(),
            planned_start_date: "".into(),
            planned_end_date: "".into(),
            actual_start_date: "".into(),
            actual_end_date: "".into(),
            status: MilestoneStatus::NotStarted,
            timestamps: Timestamps::new(),
        }
    }
}

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
