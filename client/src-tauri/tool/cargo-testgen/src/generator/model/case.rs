use crate::generator::{
    assert::model::generate_asserts,
    model::parser::{parse, TestCase, TestJson},
};

pub fn build(model: &str, json: &str) -> String {
    let parsed: TestJson = parse(json);

    let uses = parsed
        .r#use
        .iter()
        .map(|u| format!("use {};", u))
        .collect::<Vec<_>>()
        .join("\n");

    let common = build_common(&parsed.tests[0]);

    let tests = parsed
        .tests
        .iter()
        .enumerate()
        .map(|(i, t)| build_test(model, t, i))
        .collect::<Vec<_>>()
        .join("\n");

    format!("{uses}\n\n{common}\n\n{tests}")
}

fn build_common(t: &TestCase) -> String {
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

fn build_test(model: &str, t: &TestCase, index: usize) -> String {
    let test_name = format!("{}_{}_{}", model.to_lowercase(), t.method, index);
    let asserts = generate_asserts(&t.expected);

    format!(
        r#"
#[test]
fn test_{test_name}() {{
    let parsed: TestJson = load_json();
    let data = &parsed.tests[{index}];

    let mut result = {model}::new(data.input.id.clone());
    result.{method}(&data.input);

{asserts}
}}
"#,
        model = model,
        method = t.method,
        index = index,
        test_name = test_name,
        asserts = asserts
    )
}
