use app_lib::model::milestone::{Milestone, MilestoneRequest, MilestoneStatus};
use serde::Deserialize;


#[derive(Deserialize)]
struct TestJson {
    tests: Vec<TestData>,
}

#[derive(Deserialize)]
struct TestData {
    input: MilestoneRequest,
    expected: Milestone,
}

fn load_json<T: serde::de::DeserializeOwned>() -> T {
    let path = format!(
        "{}/tests/data/model/milestone.json",
        env!("CARGO_MANIFEST_DIR")
    );
    let data = std::fs::read_to_string(path).expect("failed to read json");
    serde_json::from_str(&data).expect("invalid json")
}



pub fn test_milestone_apply_request_0() {
    let parsed: TestJson = load_json();
    let data = &parsed.tests[0];

    let mut result = Milestone::new(data.input.id.clone(), data.input.project_id.clone());
    result.apply_request(&data.input);

    assert_eq!(result.description, data.expected.description);
    assert_eq!(result.end_date, data.expected.end_date);
    assert_eq!(result.id, data.expected.id);
    assert_eq!(result.owner, data.expected.owner);
    assert_eq!(result.progress, data.expected.progress);
    assert_eq!(result.project_id, data.expected.project_id);
    assert_eq!(result.start_date, data.expected.start_date);
    assert_eq!(result.status, data.expected.status);
    assert_eq!(result.tags, data.expected.tags);
    assert_eq!(result.title, data.expected.title);
}


pub fn test_milestone_apply_request_1() {
    let parsed: TestJson = load_json();
    let data = &parsed.tests[1];

    let mut result = Milestone::new(data.input.id.clone(), data.input.project_id.clone());
    result.apply_request(&data.input);

    assert_eq!(result.description, data.expected.description);
    assert_eq!(result.end_date, data.expected.end_date);
    assert_eq!(result.id, data.expected.id);
    assert_eq!(result.owner, data.expected.owner);
    assert_eq!(result.progress, data.expected.progress);
    assert_eq!(result.project_id, data.expected.project_id);
    assert_eq!(result.start_date, data.expected.start_date);
    assert_eq!(result.status, data.expected.status);
    assert_eq!(result.tags, data.expected.tags);
    assert_eq!(result.title, data.expected.title);
}


pub fn test_milestone_apply_request_2() {
    let parsed: TestJson = load_json();
    let data = &parsed.tests[2];

    let mut result = Milestone::new(data.input.id.clone(), data.input.project_id.clone());
    result.apply_request(&data.input);

    assert_eq!(result.description, data.expected.description);
    assert_eq!(result.end_date, data.expected.end_date);
    assert_eq!(result.id, data.expected.id);
    assert_eq!(result.owner, data.expected.owner);
    assert_eq!(result.progress, data.expected.progress);
    assert_eq!(result.project_id, data.expected.project_id);
    assert_eq!(result.start_date, data.expected.start_date);
    assert_eq!(result.status, data.expected.status);
    assert_eq!(result.tags, data.expected.tags);
    assert_eq!(result.title, data.expected.title);
}
