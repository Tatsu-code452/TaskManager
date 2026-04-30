use crate::generator::model::{
    builder::{self, build_new_call},
    json_parser::{self, TestJson},
};

pub fn build(model_name: &str, json: &str) -> String {
    let parsed: TestJson = json_parser::parse(json);

    let uses = parsed
        .r#use
        .iter()
        .map(|u| format!("use {};", u))
        .collect::<Vec<_>>()
        .join("\n");

    let common = builder::build_common(&parsed.tests[0]);

    let new_call = build_new_call(model_name, &parsed.keys);
    let tests = parsed
        .tests
        .iter()
        .enumerate()
        .map(|(i, t)| builder::build_test(model_name, t, &new_call, i))
        .collect::<Vec<_>>()
        .join("\n");

    format!("{uses}\n\n{common}\n\n{tests}")
}
