use crate::model::time_stamps::Timestamps;
use crate::util::id::generate_uuid;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub enum TaskStatus {
    NotStarted,
    InProgress,
    Done,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Task {
    pub id: String,
    pub project_id: String,
    pub phase_id: String,
    pub name: String,

    pub planned_start: String,
    pub planned_end: String,
    pub actual_start: String,
    pub actual_end: String,

    pub planned_hours: f64,
    pub actual_hours: f64,
    pub progress_rate: f64,

    pub status: TaskStatus,
    pub timestamps: Timestamps,
}

impl Task {
    pub fn new() -> Self {
        Self {
            id: generate_uuid(),
            project_id: "".into(),
            phase_id: "".into(),
            name: "".into(),
            planned_start: "".into(),
            planned_end: "".into(),
            actual_start: "".into(),
            actual_end: "".into(),
            planned_hours: 0.0,
            actual_hours: 0.0,
            progress_rate: 0.0,
            status: TaskStatus::NotStarted,
            timestamps: Timestamps::new(),
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct TaskRequest {
    pub id: String,
    pub project_id: String,
    pub phase_id: Option<String>,
    pub name: Option<String>,

    pub planned_start: Option<String>,
    pub planned_end: Option<String>,
    pub actual_start: Option<String>,
    pub actual_end: Option<String>,

    pub planned_hours: Option<f64>,
    pub actual_hours: Option<f64>,
    pub progress_rate: Option<f64>,

    pub status: Option<TaskStatus>,
}

pub const TASK_TEMPLATE: &[(&str, &[&str])] = &[
    ("要件定義", &["ヒアリング", "要件整理", "要件定義書作成"]),
    (
        "基本設計",
        &["画面一覧", "API一覧", "ER図作成", "基本設計書作成"],
    ),
    (
        "詳細設計",
        &["詳細設計書作成", "テーブル定義書", "API仕様書"],
    ),
    ("製造", &["実装", "コードレビュー"]),
    ("単体テスト", &["テストケース作成", "単体テスト実施"]),
    ("結合テスト", &["結合テストケース作成", "結合テスト実施"]),
    ("システムテスト", &["総合テスト", "性能テスト"]),
    ("受入テスト", &["受入テスト準備", "受入テスト実施"]),
    ("納品", &["納品物作成", "納品作業"]),
];
