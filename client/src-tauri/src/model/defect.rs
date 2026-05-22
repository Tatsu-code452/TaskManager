use crate::db::table::HasKey;
use crate::model::default_value::DefaultValue;
use crate::model::macro_model::model_with_default;
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

impl DefaultValue for DefectSeverity {
    fn default_value() -> Self {
        DefectSeverity::Minor
    }
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

impl DefaultValue for DefectStatus {
    fn default_value() -> Self {
        DefectStatus::Open
    }
}

impl HasKey<(String, String)> for Defect {
    fn key(&self) -> (String, String) {
        (self.project_id.clone(), self.id.clone())
    }
}

model_with_default!(
    Defect,
    DefectRequest,
    {
        id: String,
        project_id: String,
    },
    {
        task_id: Option<String>,
        title: String,
        description: String,
        severity: DefectSeverity,
        status: DefectStatus,
        owner: String,
        reviewer: String,
        due_date: Option<String>,
        fixed_date: Option<String>,
        verified_date: Option<String>,
        tags: Vec<Tag>,
    }
);
