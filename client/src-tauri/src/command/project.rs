use crate::command::state::AppState;
use crate::model::project::{Project, ProjectStatus};
use crate::service::project_service::ProjectService;
use tauri::State;

#[derive(serde::Deserialize)]
pub struct CreateProjectRequest {
    pub id: String,
    pub name: String,
    pub client: String,
    pub status: ProjectStatus,
    pub start_date: String,
    pub end_date: String,
}

#[derive(serde::Deserialize)]
pub struct UpdateProjectRequest {
    pub id: String,
    pub name: Option<String>,
    pub client: Option<String>,
    pub status: Option<ProjectStatus>,
    pub start_date: Option<String>,
    pub end_date: Option<String>,
}

//
// CREATE
//
#[tauri::command]
pub fn create_project(
    state: State<AppState>,
    payload: CreateProjectRequest,
) -> Result<Project, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    ProjectService::create(
        &mut db,
        payload.id,
        payload.name,
        payload.client,
        payload.status,
        payload.start_date,
        payload.end_date,
    )
}

//
// READ
//
#[tauri::command]
pub fn get_project(state: State<AppState>, id: String) -> Result<Project, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    db.find_project(&id)
        .cloned()
        .ok_or_else(|| "Project not found".into())
}

//
// UPDATE
//
#[tauri::command]
pub fn update_project(
    state: State<AppState>,
    payload: UpdateProjectRequest,
) -> Result<Project, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    ProjectService::update(
        &mut db,
        payload.id,
        payload.name,
        payload.client,
        payload.status,
        payload.start_date,
        payload.end_date,
    )
}

//
// DELETE
//
#[tauri::command]
pub fn delete_project(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    ProjectService::delete(&mut db, id)
}
