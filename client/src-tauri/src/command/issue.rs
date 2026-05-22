use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::issue::{Issue, IssueRequest};
use crate::service::issue_service::IssueService;

pub struct IssueCommand;

impl IssueCommand {
    pub fn list_impl(db: &Database, project_id: &str) -> Result<Vec<Issue>, String> {
        IssueService::list(db, project_id)
    }

    pub fn create_impl(db: &mut Database, payload: &IssueRequest) -> Result<Issue, String> {
        IssueService::create(db, payload)
    }

    pub fn update_impl(db: &mut Database, payload: &IssueRequest) -> Result<Issue, String> {
        IssueService::update(db, payload)
    }

    pub fn delete_impl(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        IssueService::delete(db, project_id, id)
    }
}

#[tauri::command]
pub fn list_issues(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<Vec<Issue>, String> {
    let db = state.db.lock().unwrap();
    IssueCommand::list_impl(&db, &project_id)
}

#[tauri::command]
pub fn create_issue(state: tauri::State<AppState>, payload: IssueRequest) -> Result<Issue, String> {
    let mut db = state.db.lock().unwrap();
    IssueCommand::create_impl(&mut db, &payload)
}

#[tauri::command]
pub fn update_issue(state: tauri::State<AppState>, payload: IssueRequest) -> Result<Issue, String> {
    let mut db = state.db.lock().unwrap();
    IssueCommand::update_impl(&mut db, &payload)
}

#[tauri::command]
pub fn delete_issue(
    state: tauri::State<AppState>,
    project_id: String,
    id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    IssueCommand::delete_impl(&mut db, &project_id, &id)
}
