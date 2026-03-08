use crate::command::state::AppState;
use crate::model::defect::{Defect, DefectSeverity, DefectStatus};
use crate::service::defect_service::DefectService;
use tauri::State;

#[derive(serde::Deserialize)]
pub struct CreateDefectRequest {
    pub id: String,
    pub project_id: String,
    pub task_id: Option<String>,
    pub title: String,
    pub description: String,
    pub severity: DefectSeverity,
    pub status: DefectStatus,
}

#[derive(serde::Deserialize)]
pub struct UpdateDefectRequest {
    pub id: String,
    pub title: Option<String>,
    pub description: Option<String>,
    pub severity: Option<DefectSeverity>,
    pub status: Option<DefectStatus>,
}

//
// CREATE
//
#[tauri::command]
pub fn create_defect(
    state: State<AppState>,
    payload: CreateDefectRequest,
) -> Result<Defect, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    DefectService::create(
        &mut db,
        payload.id,
        payload.project_id,
        payload.task_id,
        payload.title,
        payload.description,
        payload.severity,
        payload.status,
    )
}

//
// READ
//
#[tauri::command]
pub fn get_defect(state: State<AppState>, id: String) -> Result<Defect, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    db.find_defect(&id)
        .cloned()
        .ok_or_else(|| "Defect not found".into())
}

//
// UPDATE
//
#[tauri::command]
pub fn update_defect(
    state: State<AppState>,
    payload: UpdateDefectRequest,
) -> Result<Defect, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    DefectService::update(
        &mut db,
        payload.id,
        payload.title,
        payload.description,
        payload.severity,
        payload.status,
    )
}

//
// DELETE
//
#[tauri::command]
pub fn delete_defect(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    DefectService::delete(&mut db, id)
}
