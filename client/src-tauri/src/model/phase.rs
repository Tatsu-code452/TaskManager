use crate::model::time_stamps::Timestamps;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Phase {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub order: u32,
    pub inputs: Vec<String>,
    pub outputs: Vec<String>,
    pub timestamps: Timestamps,
}

#[derive(serde::Deserialize)]
pub struct PhaseRequest {
    pub id: String,
    pub project_id: String,
    pub name: Option<String>,
    pub order: Option<u32>,
    pub inputs: Option<Vec<String>>,
    pub outputs: Option<Vec<String>>,
}

impl Phase {
    pub fn new(id: String, project_id: String) -> Self {
        Self {
            id,
            project_id,
            name: "".into(),
            order: 1,
            inputs: vec![],
            outputs: vec![],
            timestamps: Timestamps::new(),
        }
    }
}

pub const PHASE_TEMPLATE: &[(&str, usize)] = &[
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