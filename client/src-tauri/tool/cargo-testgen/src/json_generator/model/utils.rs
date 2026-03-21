use serde_json::{json, Value};

use crate::json_generator::model::structs::{DefaultKind, FieldType};

pub fn build_use(base: &str, module: &str, target: &str) -> String {
    format!("{}::{}::{}", base, module, target)
}

pub fn build_tests(
    method: &str,
    input_type: &str,
    input: &Value,
    expected_type: &str,
    expected: &Value,
) -> Value {
    json!({
        "method": method,
        "input_type": input_type,
        "expected_type": expected_type,
        "input": input,
        "expected": expected,
    })
}

pub fn example_value(ty: &FieldType) -> serde_json::Value {
    match ty {
        FieldType::String => json!("example"),
        FieldType::Integer => json!(0),
        FieldType::Boolean => json!(false),
        FieldType::Enum(enum_name) => {
            // 最初の variant を使う
            json!(enum_name)
        }
        FieldType::Option(_inner) => {
            // Option は null
            json!(null)
        }
        FieldType::Vec(_) => json!([]),
        FieldType::Custom(_) => json!("example"),
    }
}

pub fn add_timestamps(map: &mut serde_json::Map<String, serde_json::Value>) {
    // timestamps
    map.insert(
        "timestamps".to_string(),
        json!({
            "created_at": "2024-01-01T00:00:00Z",
            "updated_at": "2024-01-01T00:00:00Z"
        }),
    );
}

pub fn default_to_json(def: &DefaultKind) -> serde_json::Value {
    match def {
        DefaultKind::String(s) => json!(s),
        DefaultKind::Integer(i) => json!(i),
        DefaultKind::Boolean(b) => json!(b),
        DefaultKind::EnumVariant {
            enum_name: _,
            variant,
        } => json!(variant),
        DefaultKind::Null => json!(null),
        DefaultKind::EmptyArray => json!([]),
    }
}
