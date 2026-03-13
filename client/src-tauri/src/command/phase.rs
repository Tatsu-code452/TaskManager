use crate::command::state::AppState;
use crate::model::phase::{Phase, PhaseRequest};
use crate::service::phase_service::PhaseService;
use tauri::State;

//
// CREATE
//
#[tauri::command]
pub fn create_phase(state: State<AppState>, payload: PhaseRequest) -> Result<Phase, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    PhaseService::create(&mut db, payload)
}

//
// READ
//
#[tauri::command]
pub fn get_phase(state: State<AppState>, id: String) -> Result<Phase, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    db.find_phase(&id)
        .cloned()
        .ok_or_else(|| "Phase not found".into())
}

//
// UPDATE
//
#[tauri::command]
pub fn update_phase(state: State<AppState>, payload: PhaseRequest) -> Result<Phase, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    PhaseService::update(&mut db, payload)
}

//
// DELETE
//
#[tauri::command]
pub fn delete_phase(state: State<AppState>, id: String, project_id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    PhaseService::delete(&mut db, id, project_id)
}
