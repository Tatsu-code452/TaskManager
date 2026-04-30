use app_lib::command::defect::DefectCommand;
use app_lib::db::database::Database;
use app_lib::model::defect::{Defect, DefectRequest, DefectSeverity, DefectStatus};
use app_lib::model::tag::{Tag, TagType};
use app_lib::model::time_stamps::Timestamps;
use it::mock_db::load_mock_db;


mod it;
#[macro_use]
mod macros;


test_helper!(
    DefectRequestBuilder,
    DefectRequest,
    Defect,
    {
        id: String => "".into(),
        project_id: String => "".into(),
    },
    {
        due_date: Option<String> => None,
        task_id: Option<String> => None,
        tags: Vec<Tag> => None,
        reviewer: String => None,
        verified_date: Option<String> => None,
        title: String => None,
        severity: DefectSeverity => None,
        description: String => None,
        owner: String => None,
        status: DefectStatus => None,
        fixed_date: Option<String> => None,
    }
);


#[test]
fn test_defect() {
    let mut db = load_mock_db("tests/data/mock_db_all.json");

    test_list_defect_no_key_returns_all(&mut db);
    test_list_defect_single_key(&mut db);

    test_create_defect_no_key_not_created(&mut db);
    test_create_defect_key_only_initial_values(&mut db);
    test_create_defect_full_info(&mut db);
    test_create_defect_gap_id_assigns_next_max(&mut db);

    test_update_defect_no_key_not_updated(&mut db);
    test_update_defect_full_info(&mut db);
    test_update_defect_key_only_initial_values(&mut db);
    test_update_defect_not_found(&mut db);

    test_delete_defect_no_key_not_deleted(&mut db);
    test_delete_defect_success(&mut db);
    test_delete_defect_not_found(&mut db);
}


fn test_list_defect_no_key_returns_all(db: &Database) {
    println!("run {}", "test_list_defect_no_key_returns_all");

    let result = DefectCommand::list_impl(db, "".into());

    assert!(result.is_err());
}

fn test_list_defect_single_key(db: &Database) {
    println!("run {}", "test_list_defect_single_key");

    let result = DefectCommand::list_impl(db, "P1".into());
    let list = result.clone().unwrap();

    assert!(result.is_ok());
    assert!(list.iter().all(|d| d.project_id == "P1"));
}


fn test_create_defect_no_key_not_created(db: &mut Database) {
    println!("run {}", "test_create_defect_no_key_not_created");

    let before = db.defects.len();
    let payload = DefectRequestBuilder::new().build();

    let result = DefectCommand::create_impl(db, payload);

    assert!(result.is_err());
    assert_eq!(db.defects.len(), before);
}

fn test_create_defect_key_only_initial_values(db: &mut Database) {
    println!("run {}", "test_create_defect_key_only_initial_values");

    let before = db.defects.len();
    let payload = DefectRequest {
        project_id: "P1".into(),
        ..DefectRequestBuilder::default_request()
    };
    let expected = Defect {
        project_id: "P1".into(),
        id: "DEFECT-4".into(),
        task_id: None,
        title: "".into(),
        description: "".into(),
        severity: DefectSeverity::Minor,
        status: DefectStatus::Open,
        owner: "".into(),
        reviewer: "".into(),
        due_date: None,
        fixed_date: None,
        verified_date: None,
        tags: vec![],
        timestamps: Timestamps::new(),
    };

    let result = DefectCommand::create_impl(db, payload);

    assert!(result.is_ok());
    assert_eq!(db.defects.len(), before + 1);
    assert_object(&result.unwrap(), &expected);
}

fn test_create_defect_full_info(db: &mut Database) {
    println!("run {}", "test_create_defect_full_info");

    let payload = DefectRequest {
        project_id: "P1".into(),
        task_id: Some(Some("T1".into())),
        title: Some("タイトル".into()),
        description: Some("説明".into()),
        severity: Some(DefectSeverity::Major),
        status: Some(DefectStatus::Open),
        owner: Some("佐藤".into()),
        reviewer: Some("田中".into()),
        tags: Some(vec![Tag { tag_type: TagType::Domain, value: "Rust".into(), }, Tag { tag_type: TagType::Topic, value: "採番".into(), }]),
        ..DefectRequestBuilder::default_request()
    };
    let expected = Defect {
        project_id: "P1".into(),
        id: "DEFECT-5".into(),
        task_id: Some("T1".into()),
        title: "タイトル".into(),
        description: "説明".into(),
        severity: DefectSeverity::Major,
        status: DefectStatus::Open,
        owner: "佐藤".into(),
        reviewer: "田中".into(),
        due_date: None,
        fixed_date: None,
        verified_date: None,
        tags: vec![Tag { tag_type: TagType::Domain, value: "Rust".into(), }, Tag { tag_type: TagType::Topic, value: "採番".into(), }],
        timestamps: Timestamps::new(),
    };

    let result = DefectCommand::create_impl(db, payload);
    let d = db.find_defect("P1", "DEFECT-5");

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}

fn test_create_defect_gap_id_assigns_next_max(db: &mut Database) {
    println!("run {}", "test_create_defect_gap_id_assigns_next_max");

    let payload = DefectRequestBuilder::new().project_id("P1").build();

    let result = DefectCommand::create_impl(db, payload);
    let d = db.find_defect("P1", "DEFECT-4");

    assert!(result.is_ok());
    assert_eq!(&d.unwrap().id, "DEFECT-4"); // 最大値+1
}


fn test_update_defect_no_key_not_updated(db: &mut Database) {
    println!("run {}", "test_update_defect_no_key_not_updated");

    let payload = DefectRequestBuilder::new().title("変更後".into()).build();

    let result = DefectCommand::update_impl(db, payload);

    assert!(result.is_err());
}

fn test_update_defect_key_only_initial_values(db: &mut Database) {
    println!("run {}", "test_update_defect_key_only_initial_values");

    let payload = DefectRequestBuilder::new()
            .id("D1")
            .project_id("P1")
            .build();
    let old = db.find_defect("P1", "D1");
    let expected = Defect {
        project_id: "P1".into(),
        id: "D1".into(),
        ..old.unwrap().clone()
    };

    let result = DefectCommand::update_impl(db, payload);
    let d = db.find_defect("P1", "D1");

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}

fn test_update_defect_full_info(db: &mut Database) {
    println!("run {}", "test_update_defect_full_info");

    let payload = DefectRequest {
        id: "D1".into(),
        project_id: "P1".into(),
        task_id: Some(Some("T2".into())),
        title: Some("修正後".into()),
        description: Some("説明修正".into()),
        severity: Some(DefectSeverity::Minor),
        status: Some(DefectStatus::Fixed),
        owner: Some("山田".into()),
        reviewer: Some("鈴木".into()),
        tags: Some(vec![Tag { tag_type: TagType::Area, value: "テスト".into(), }, Tag { tag_type: TagType::Topic, value: "バリデーション".into(), }]),
        ..DefectRequestBuilder::default_request()
    };
    let expected = Defect {
        project_id: "P1".into(),
        id: "D1".into(),
        task_id: Some("T2".into()),
        title: "修正後".into(),
        description: "説明修正".into(),
        severity: DefectSeverity::Minor,
        status: DefectStatus::Fixed,
        owner: "山田".into(),
        reviewer: "鈴木".into(),
        due_date: None,
        fixed_date: None,
        verified_date: None,
        tags: vec![Tag { tag_type: TagType::Area, value: "テスト".into(), }, Tag { tag_type: TagType::Topic, value: "バリデーション".into(), }],
        timestamps: Timestamps::new(),
    };

    let result = DefectCommand::update_impl(db, payload);
    let d = db.find_defect("P1", "D1");

    assert!(result.is_ok());
    assert_object(&d.unwrap(), &expected);
}

fn test_update_defect_not_found(db: &mut Database) {
    println!("run {}", "test_update_defect_not_found");

    let payload = DefectRequestBuilder::new()
            .id("D999")
            .project_id("P1")
            .title("更新".into())
            .build();

    let result = DefectCommand::update_impl(db, payload);

    assert!(result.is_err());
}


fn test_delete_defect_no_key_not_deleted(db: &mut Database) {
    println!("run {}", "test_delete_defect_no_key_not_deleted");

    let result = DefectCommand::delete_impl(db, "".into(), "".into());

    assert!(result.is_err());
}

fn test_delete_defect_success(db: &mut Database) {
    println!("run {}", "test_delete_defect_success");

    let result = DefectCommand::delete_impl(db, "P1".into(), "DEFECT-1".into());

    assert!(result.is_ok());
    assert!(db.defects.iter().all(|d| !(d.project_id == "P1" && d.id == "DEFECT-1")));
}

fn test_delete_defect_not_found(db: &mut Database) {
    println!("run {}", "test_delete_defect_not_found");

    let result = DefectCommand::delete_impl(db, "P1".into(), "D999".into());

    assert!(result.is_err());
}

