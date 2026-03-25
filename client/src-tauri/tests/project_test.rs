use app_lib::command::project::ProjectCommand;
use app_lib::db::database::Database;
use app_lib::model::project::{Project, ProjectRequest, ProjectStatus};
use app_lib::model::time_stamps::Timestamps;
use it::mock_db::load_mock_db;

mod it;
#[macro_use]
mod macros;

test_helper!(
    ProjectRequestBuilder,
    ProjectRequest,
    Project,
    {
        id: String => "".into(),
    },
    {
        owner: String => None,
        description: String => None,
        status: ProjectStatus => None,
        end_date: Option<String> => None,
        client: String => None,
        name: String => None,
        start_date: Option<String> => None,
    }
);

#[test]
fn test_project() {
    let mut db = load_mock_db("tests/data/mock_db_all.json");

    test_list_project_no_key_returns_all(&mut db);

    test_create_project_no_key_not_created(&mut db);
    test_create_project_key_only_initial_values(&mut db);
    test_create_project_full_info(&mut db);

    test_update_project_no_key_not_updated(&mut db);
    test_update_project_full_info(&mut db);
    test_update_project_key_only_initial_values(&mut db);
    test_update_project_not_found(&mut db);

    test_delete_project_no_key_not_deleted(&mut db);
    test_delete_project_success(&mut db);
    test_delete_project_not_found(&mut db);
}

fn test_list_project_no_key_returns_all(db: &Database) {
    println!("run {}", "test_list_project_no_key_returns_all");

    let result = ProjectCommand::list_impl(db);

    assert!(result.is_ok());
}

fn test_create_project_no_key_not_created(db: &mut Database) {
    println!("run {}", "test_create_project_no_key_not_created");

    let before = db.projects.len();
    let payload = ProjectRequestBuilder::new().build();

    let result = ProjectCommand::create_impl(db, payload);

    assert!(result.is_err());
    assert_eq!(db.projects.len(), before);
}

fn test_create_project_key_only_initial_values(db: &mut Database) {
    println!("run {}", "test_create_project_key_only_initial_values");

    let before = db.projects.len();
    let payload = ProjectRequest {
        id: "P999".into(),
        ..ProjectRequestBuilder::default_request()
    };
    let expected = Project {
        id: "P999".into(),
        name: "".into(),
        client: "".into(),
        description: "".into(),
        status: ProjectStatus::Planned,
        start_date: None,
        end_date: None,
        owner: "".into(),
        timestamps: Timestamps::new(),
    };

    let result = ProjectCommand::create_impl(db, payload);

    assert!(result.is_ok());
    assert_eq!(db.projects.len(), before + 1);
    assert_object(&result.unwrap(), &expected);
}

fn test_create_project_full_info(db: &mut Database) {
    println!("run {}", "test_create_project_full_info");

    let payload = ProjectRequest {
        id: "P3".into(),
        name: Some("プロジェクトC".into()),
        client: Some("顧客X".into()),
        description: Some("説明文".into()),
        status: Some(ProjectStatus::Active),
        start_date: Some(Some("2024-01-01".into())),
        end_date: Some(Some("2024-12-31".into())),
        owner: Some("佐藤".into()),
        ..ProjectRequestBuilder::default_request()
    };
    let expected = Project {
        id: "P3".into(),
        name: "プロジェクトC".into(),
        client: "顧客X".into(),
        description: "説明文".into(),
        status: ProjectStatus::Active,
        start_date: Some("2024-01-01".into()),
        end_date: Some("2024-12-31".into()),
        owner: "佐藤".into(),
        timestamps: Timestamps::new(),
    };

    let result = ProjectCommand::create_impl(db, payload);
    let d = db.find_project("P3");

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}

fn test_update_project_no_key_not_updated(db: &mut Database) {
    println!("run {}", "test_update_project_no_key_not_updated");

    let payload = ProjectRequestBuilder::new().name("変更後".into()).build();

    let result = ProjectCommand::update_impl(db, payload);

    assert!(result.is_err());
}

fn test_update_project_key_only_initial_values(db: &mut Database) {
    println!("run {}", "test_update_project_key_only_initial_values");

    let payload = ProjectRequestBuilder::new().id("P1").build();
    let old = db.find_project("P1");
    let expected = Project {
        id: "P1".into(),
        ..old.unwrap().clone()
    };

    let result = ProjectCommand::update_impl(db, payload);
    let d = db.find_project("P1");

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}

fn test_update_project_full_info(db: &mut Database) {
    println!("run {}", "test_update_project_full_info");

    let payload = ProjectRequest {
        id: "P1".into(),
        name: Some("修正後".into()),
        client: Some("顧客Y".into()),
        description: Some("説明修正".into()),
        status: Some(ProjectStatus::Completed),
        start_date: Some(Some("2024-02-01".into())),
        end_date: Some(Some("2024-11-30".into())),
        owner: Some("山田".into()),
        ..ProjectRequestBuilder::default_request()
    };
    let expected = Project {
        id: "P1".into(),
        name: "修正後".into(),
        client: "顧客Y".into(),
        description: "説明修正".into(),
        status: ProjectStatus::Completed,
        start_date: Some("2024-02-01".into()),
        end_date: Some("2024-11-30".into()),
        owner: "山田".into(),
        timestamps: Timestamps::new(),
    };

    let result = ProjectCommand::update_impl(db, payload);
    let d = db.find_project("P1");

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}

fn test_update_project_not_found(db: &mut Database) {
    println!("run {}", "test_update_project_not_found");

    let payload = ProjectRequestBuilder::new()
        .id("P998")
        .name("更新".into())
        .build();

    let result = ProjectCommand::update_impl(db, payload);

    assert!(result.is_err());
}

fn test_delete_project_no_key_not_deleted(db: &mut Database) {
    println!("run {}", "test_delete_project_no_key_not_deleted");

    let result = ProjectCommand::delete_impl(db, "".into());

    assert!(result.is_err());
}

fn test_delete_project_success(db: &mut Database) {
    println!("run {}", "test_delete_project_success");

    let result = ProjectCommand::delete_impl(db, "P1".into());

    assert!(result.is_ok());
    assert!(db.projects.iter().all(|p| p.id != "P1"));
}

fn test_delete_project_not_found(db: &mut Database) {
    println!("run {}", "test_delete_project_not_found");

    let result = ProjectCommand::delete_impl(db, "P998".into());

    assert!(result.is_err());
}
