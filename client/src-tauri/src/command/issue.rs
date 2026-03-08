use crate::command::state::AppState;
use crate::model::issue::{Issue, IssuePriority, IssueStatus};
use crate::service::issue_service::IssueService;
use tauri::State;

#[derive(serde::Deserialize)]
pub struct CreateIssueRequest {
    pub id: String,
    pub project_id: String,
    pub task_id: Option<String>,
    pub title: String,
    pub description: String,
    pub status: IssueStatus,
    pub priority: IssuePriority,
    pub owner: String,
}

#[derive(serde::Deserialize)]
pub struct UpdateIssueRequest {
    pub id: String,
    pub title: Option<String>,
    pub description: Option<String>,
    pub status: Option<IssueStatus>,
    pub priority: Option<IssuePriority>,
    pub owner: Option<String>,
}

//
// CREATE
//
#[tauri::command]
pub fn create_issue(state: State<AppState>, payload: CreateIssueRequest) -> Result<Issue, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    IssueService::create(
        &mut db,
        payload.id,
        payload.project_id,
        payload.task_id,
        payload.title,
        payload.description,
        payload.status,
        payload.priority,
        payload.owner,
    )
}

//
// READ
//
#[tauri::command]
pub fn get_issue(state: State<AppState>, id: String) -> Result<Issue, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    db.find_issue(&id)
        .cloned()
        .ok_or_else(|| "Issue not found".into())
}

//
// UPDATE
//
#[tauri::command]
pub fn update_issue(state: State<AppState>, payload: UpdateIssueRequest) -> Result<Issue, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    IssueService::update(
        &mut db,
        payload.id,
        payload.title,
        payload.description,
        payload.status,
        payload.priority,
        payload.owner,
    )
}

//
// DELETE
//
#[tauri::command]
pub fn delete_issue(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    IssueService::delete(&mut db, id)
}
