use app_lib::db::database::Database;
use std::fs;

pub fn load_mock_db(path_str: &str) -> Database {
    let path = format!("{}/{}", env!("CARGO_MANIFEST_DIR"), path_str);
    let content = fs::read_to_string(path).expect("failed to read mock db");
    let mut db: Database = serde_json::from_str(&content).expect("invalid mock db json");

    db.is_test = true;
    db.rebuild_project_index();
    db.rebuild_defect_index();
    db
}
