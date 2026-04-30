use serde_json::json;

use crate::json_generator::model::{structs::ModelInfo, utils};

pub enum TestCaseKind {
    KeysOnly, // new() の keys だけ
    Partial,  // keys + 一部の apply_request フィールド
    Full,     // keys + 全フィールド
}

pub fn build_json(model: &ModelInfo) -> serde_json::Value {
    json!({
        "use": build_use_list(model),
        "keys": model.keys.iter().map(|k| k.name.clone()).collect::<Vec<_>>(),
        "tests": build_tests(model),
    })
}

fn build_use_list(model: &ModelInfo) -> Vec<String> {
    let base = "app_lib::model";
    let mut uses = vec![
        utils::build_use(base, &model.model_name.to_lowercase(), &model.model_name),
        utils::build_use(base, &model.model_name.to_lowercase(), &model.request_name),
        "serde::Deserialize".to_string(),
    ];

    for en in &model.enums {
        uses.push(utils::build_use(
            base,
            &model.model_name.to_lowercase(),
            &en.name,
        ));
    }

    uses
}

fn build_tests(model: &ModelInfo) -> Vec<serde_json::Value> {
    let cases = vec![
        TestCaseKind::KeysOnly,
        TestCaseKind::Partial,
        TestCaseKind::Full,
    ];

    cases
        .into_iter()
        .map(|case| {
            let input = build_input(model, &case);
            let expected = build_expected(model, &input);

            utils::build_tests(
                "apply_request",
                &model.request_name,
                &input,
                &model.model_name,
                &expected,
            )
        })
        .collect()
}

fn build_input(model: &ModelInfo, case: &TestCaseKind) -> serde_json::Value {
    let mut map = serde_json::Map::new();

    // keys は必ず入れる
    for key in &model.keys {
        map.insert(key.name.clone(), utils::example_value(&key.ty));
    }

    match case {
        TestCaseKind::KeysOnly => {
            // keys 以外は入れない
        }
        TestCaseKind::Partial => {
            // fields の一部だけ入れる
            for field in model.fields.iter().take(2) {
                map.insert(field.name.clone(), utils::example_value(&field.ty));
            }
        }
        TestCaseKind::Full => {
            // 全項目を入れる
            for field in &model.fields {
                map.insert(field.name.clone(), utils::example_value(&field.ty));
            }
        }
    }

    json!(map)
}

fn build_expected(model: &ModelInfo, input: &serde_json::Value) -> serde_json::Value {
    let mut map: serde_json::Map<String, serde_json::Value> = serde_json::Map::new();

    // keys
    for key in &model.keys {
        map.insert(key.name.clone(), input[key.name.clone()].clone());
    }

    // fields
    for field in &model.fields {
        let name = &field.name;

        if let Some(v) = input.get(name) {
            map.insert(name.clone(), v.clone());
        } else {
            // default 値を入れる
            let def = model.defaults.iter().find(|d| d.name == *name).unwrap();
            map.insert(name.clone(), utils::default_to_json(&def.value));
        }
    }

    utils::add_timestamps(&mut map);

    json!(map)
}
