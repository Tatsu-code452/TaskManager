use crate::model::defect::{Defect, DefectRequest};
use crate::{command::state::AppState, service::defect_service::DefectService};
use tauri::State;

#[tauri::command]
pub fn list_defects(state: State<AppState>, project_id: String) -> Result<Vec<Defect>, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    DefectService::list(&mut db, project_id)
}

#[tauri::command]
pub fn create_defect(state: State<AppState>, payload: DefectRequest) -> Result<Defect, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    DefectService::create(&mut db, payload)
}

#[tauri::command]
pub fn update_defect(state: State<AppState>, payload: DefectRequest) -> Result<Defect, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    DefectService::update(&mut db, payload)
}

#[tauri::command]
pub fn delete_defect(state: State<AppState>, id: String, project_id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    DefectService::delete(&mut db, id, project_id)
}
