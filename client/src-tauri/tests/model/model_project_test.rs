use app_lib::model::project::{Project, ProjectRequest, ProjectStatus};
use serde::Deserialize;


#[derive(Deserialize)]
struct TestJson {
    tests: Vec<TestData>,
}

#[derive(Deserialize)]
struct TestData {
    input: ProjectRequest,
    expected: Project,
}

fn load_json<T: serde::de::DeserializeOwned>() -> T {
    let path = format!(
        "{}/tests/data/model/project.json",
        env!("CARGO_MANIFEST_DIR")
    );
    let data = std::fs::read_to_string(path).expect("failed to read json");
    serde_json::from_str(&data).expect("invalid json")
}



#[test]
fn test_project_apply_request_0() {
    let parsed: TestJson = load_json();
    let data = &parsed.tests[0];

    let mut result = Project::new(data.input.id.clone());
    result.apply_request(&data.input);

    assert_eq!(result.client, data.expected.client);
    assert_eq!(result.description, data.expected.description);
    assert_eq!(result.end_date, data.expected.end_date);
    assert_eq!(result.id, data.expected.id);
    assert_eq!(result.name, data.expected.name);
    assert_eq!(result.owner, data.expected.owner);
    assert_eq!(result.start_date, data.expected.start_date);
    assert_eq!(result.status, data.expected.status);
}


#[test]
fn test_project_apply_request_1() {
    let parsed: TestJson = load_json();
    let data = &parsed.tests[1];

    let mut result = Project::new(data.input.id.clone());
    result.apply_request(&data.input);

    assert_eq!(result.client, data.expected.client);
    assert_eq!(result.description, data.expected.description);
    assert_eq!(result.end_date, data.expected.end_date);
    assert_eq!(result.id, data.expected.id);
    assert_eq!(result.name, data.expected.name);
    assert_eq!(result.owner, data.expected.owner);
    assert_eq!(result.start_date, data.expected.start_date);
    assert_eq!(result.status, data.expected.status);
}


#[test]
fn test_project_apply_request_2() {
    let parsed: TestJson = load_json();
    let data = &parsed.tests[2];

    let mut result = Project::new(data.input.id.clone());
    result.apply_request(&data.input);

    assert_eq!(result.client, data.expected.client);
    assert_eq!(result.description, data.expected.description);
    assert_eq!(result.end_date, data.expected.end_date);
    assert_eq!(result.id, data.expected.id);
    assert_eq!(result.name, data.expected.name);
    assert_eq!(result.owner, data.expected.owner);
    assert_eq!(result.start_date, data.expected.start_date);
    assert_eq!(result.status, data.expected.status);
}
