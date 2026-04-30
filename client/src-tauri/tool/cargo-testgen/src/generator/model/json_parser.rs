use serde::Deserialize;
use serde_json::Value;

#[derive(Deserialize)]
pub struct TestJson {
    pub r#use: Vec<String>,
    pub keys: Vec<String>,
    pub tests: Vec<TestCase>,
}

#[derive(Deserialize)]
pub struct TestCase {
    pub data_path: String,
    pub method: String,
    pub input_type: String,
    pub expected_type: String,
    pub expected: Value,
}

pub fn parse(text: &str) -> TestJson {
    serde_json::from_str(text).expect("Invalid JSON format")
}
