use crate::define_model_all;
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

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(rename_all = "PascalCase")]
pub enum PhaseStatus {
    NotStarted,
    InProgress,
    Completed,
}

define_model_all!(
    Phase,
    PhaseRequest,
    PhaseRequest,
    {
        id: String,
        project_id: String,
    },
    {
        name: String => "".into(),
        order: u32 => 1,
        status: PhaseStatus =>PhaseStatus::NotStarted,
        start_date: Option<String> => None,
        end_date: Option<String> => None,
        inputs: Vec<String> => vec![],
        outputs: Vec<String> => vec![],
        owner: String => "".into(),
    }
);
