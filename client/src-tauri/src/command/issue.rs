use crate::{command::state::AppState, service::issue_service::IssueService};
use tauri::State;
use crate::model::issue::{Issue, IssueRequest};

#[tauri::command]
pub fn list_issues(
    state: State<AppState>,
    project_id: String,
) -> Result<Vec<Issue>, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    IssueService::list(&mut db, project_id)
}

#[tauri::command]
pub fn create_issue(
    state: State<AppState>,
    payload: IssueRequest,
) -> Result<Issue, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    IssueService::create(&mut db, payload)
}

#[tauri::command]
pub fn update_issue(
    state: State<AppState>,
    payload: IssueRequest,
) -> Result<Issue, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    IssueService::update(&mut db, payload)
}

#[tauri::command]
pub fn delete_issue(
    state: State<AppState>,
    id: String,
    project_id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    IssueService::delete(&mut db, id, project_id)
}
