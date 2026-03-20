use crate::define_model;
use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

pub const PHASE_TEMPLATE: &[(&str, u32)] = &[
    ("要件定義", 1),
    ("基本設計", 2),
    ("詳細設計", 3),
    ("製造", 4),
    ("単体テスト", 5),
    ("結合テスト", 6),
    ("システムテスト", 7),
    ("受入テスト", 8),
    ("納品", 9),
];

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "PascalCase")]
pub enum PhaseStatus {
    NotStarted,
    InProgress,
    Completed,
}

define_model!(
    Phase,
    PhaseRequest,
    PhaseRequest,
    {
        id: String,
        project_id: String,
    },
    {
        name: String,
        order: u32,
        status: PhaseStatus,
        start_date: Option<String>,
        end_date: Option<String>,
        inputs: Vec<String>,
        outputs: Vec<String>,
        owner: String,
    },
    {
        name: "".into(),
        order: 1,
        status: PhaseStatus::NotStarted,
        start_date: None,
        end_date: None,
        inputs: vec![],
        outputs: vec![],
        owner: "".into(),
    }
);
