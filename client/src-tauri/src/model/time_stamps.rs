use crate::util::time::now_string;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Timestamps {
    pub created_at: String,
    pub updated_at: String,
}

impl Timestamps {
    /// 新規作成時（created_at = updated_at = now）
    pub fn new() -> Self {
        let now = now_string();
        Self {
            created_at: now.clone(),
            updated_at: now,
        }
    }

    /// 更新時（updated_at のみ更新）
    pub fn touch(&mut self) {
        self.updated_at = now_string();
    }
}
