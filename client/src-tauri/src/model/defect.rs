use crate::define_model_all;
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

define_model_all!(
    Defect,
    DefectRequest,
    DefectRequest,
    {
        id: String,
        project_id: String,
    },
    {
        task_id: Option<String> => None,
        title: String => "".into(),
        description: String => "".into(),
        severity: DefectSeverity => DefectSeverity::Minor,
        status: DefectStatus => DefectStatus::Open,
        owner: String => "".into(),
        reviewer: String => "".into(),
        due_date: Option<String> => None,
        fixed_date: Option<String> => None,
        verified_date: Option<String> => None,
        tags: Vec<Tag> => vec![],
    }
);
