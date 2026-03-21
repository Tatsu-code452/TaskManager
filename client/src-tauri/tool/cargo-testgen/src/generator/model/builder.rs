use std::path::Path;

use crate::{
    analyzer::new_args::extract_new_args,
    generator::model::{assert, json_parser::TestCase},
};

pub fn build_common(t: &TestCase) -> String {
    format!(
        r#"
#[derive(Deserialize)]
struct TestJson {{
    tests: Vec<TestData>,
}}

#[derive(Deserialize)]
struct TestData {{
    input: {input_type},
    expected: {expected_type},
}}

fn load_json<T: serde::de::DeserializeOwned>() -> T {{
    let path = format!(
        "{{}}/{data_path}",
        env!("CARGO_MANIFEST_DIR")
    );
    let data = std::fs::read_to_string(path).expect("failed to read json");
    serde_json::from_str(&data).expect("invalid json")
}}
"#,
        data_path = t.data_path,
        input_type = t.input_type,
        expected_type = t.expected_type,
    )
}

pub fn build_test(model: &str, t: &TestCase, new_call: &str, index: usize) -> String {
    let test_name = format!("{}_{}_{}", model.to_lowercase(), t.method, index);
    let asserts = assert::build(&t.expected);

    format!(
        r#"
#[test]
fn test_{test_name}() {{
    let parsed: TestJson = load_json();
    let data = &parsed.tests[{index}];

    {new_call}
    result.{method}(&data.input);

{asserts}
}}
"#,
        index = index,
        test_name = test_name,
        asserts = asserts,
        new_call = new_call,
        method = t.method,
    )
}

pub fn build_new_call(
    model_name: &str,
    json_keys: &[String],
) -> String {
    // ② JSON の keys に含まれるものだけ使う
    let args_code = json_keys
        .iter()
        .map(|arg| format!("data.input.{}.clone()", arg))
        .collect::<Vec<_>>()
        .join(", ");

    // ③ new() 呼び出しコードを返す
    format!("let mut result = {}::new({});", model_name, args_code)
}
