pub mod template;
pub mod template_create;
pub mod template_delete;
pub mod template_helper;
pub mod template_list;
pub mod template_update;
pub mod template_use;
pub mod writer;

use serde::Deserialize;
use std::collections::HashMap;

//
// ─────────────────────────────────────────────
// Entity
// ─────────────────────────────────────────────
//
#[derive(Debug, Deserialize)]
pub struct EntityPatterns {
    pub static_name: String,
    pub command_name: String,
    pub table_name: String,
    pub model_type: String,
}

//
// ─────────────────────────────────────────────
// test_helper
// ─────────────────────────────────────────────
//
#[derive(Debug, Deserialize)]
pub struct TestHelperPatterns {
    pub builder_type: String,
    pub request_type: String,
    pub model_type: String,
    pub required_fields: HashMap<String, String>,
    pub optional_fields: HashMap<String, String>,
}

//
// ─────────────────────────────────────────────
// list
// ─────────────────────────────────────────────
//
#[derive(Debug, Deserialize)]
pub struct ListPatterns {
    pub list_key_no: String,
    pub list_key_single: String,
    pub list_find_expr: String,
}

//
// ─────────────────────────────────────────────
// create
// ─────────────────────────────────────────────
//
#[derive(Debug, Deserialize)]
pub struct CreatePatterns {
    pub create_payload_init: String,
    pub create_expected_init: String,

    pub create_payload_full: String,
    pub create_expected_full: String,
    pub create_find_expr_full: String,

    pub create_payload_gap: String,
    pub create_find_expr_gap: String,
    pub create_expected_gap: String,
}

//
// ─────────────────────────────────────────────
// update
// ─────────────────────────────────────────────
//
#[derive(Debug, Deserialize)]
pub struct UpdatePatterns {
    pub update_payload_no: String,

    pub update_payload_init: String,
    pub update_find_expr_init: String,
    pub update_expected_init: String,

    pub update_payload_full: String,
    pub update_expected_full: String,
    pub update_find_expr_full: String,

    pub update_payload_not: String,
}

//
// ─────────────────────────────────────────────
// delete
// ─────────────────────────────────────────────
//
#[derive(Debug, Deserialize)]
pub struct DeletePatterns {
    pub delete_key_no: String,
    pub delete_key_ok: String,
    pub delete_key_ng: String,
    pub delete_find_expr_ok: String,
}

//
// ─────────────────────────────────────────────
// defect.json 全体
// ─────────────────────────────────────────────
//
#[derive(Debug, Deserialize)]
pub struct TestPatterns {
    pub entity: EntityPatterns,
    pub r#use: Vec<String>,
    pub test_helper: TestHelperPatterns,
    pub list: ListPatterns,
    pub create: CreatePatterns,
    pub update: UpdatePatterns,
    pub delete: DeletePatterns,
}
