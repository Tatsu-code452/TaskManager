use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub enum TagType {
    Domain, // 技術領域 (Frontend, Backend, DB, API, UI, Rust, React)
    Area,   // 業務領域 (仕様, 設計, 実装, テスト)
    Topic,  // テーマ (採番, バリデーション, 認証, 権限)
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub struct Tag {
    pub tag_type: TagType,
    pub value: String,
}
