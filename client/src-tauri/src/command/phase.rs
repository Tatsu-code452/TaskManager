use crate::command::state::AppState;
use crate::model::phase::Phase;
use crate::service::phase_service::PhaseService;
use tauri::State;

#[derive(serde::Deserialize)]
pub struct CreatePhaseRequest {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub order: u32,
    pub inputs: Vec<String>,
    pub outputs: Vec<String>,
}

#[derive(serde::Deserialize)]
pub struct UpdatePhaseRequest {
    pub id: String,
    pub project_id: Option<String>,
    pub name: Option<String>,
    pub order: Option<u32>,
    pub inputs: Option<Vec<String>>,
    pub outputs: Option<Vec<String>>,
}

//
// CREATE
//
#[tauri::command]
pub fn create_phase(state: State<AppState>, payload: CreatePhaseRequest) -> Result<Phase, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    PhaseService::create(
        &mut db,
        payload.id,
        payload.project_id,
        payload.name,
        payload.order,
        payload.inputs,
        payload.outputs,
    )
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
pub fn update_phase(state: State<AppState>, payload: UpdatePhaseRequest) -> Result<Phase, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    PhaseService::update(
        &mut db,
        payload.id,
        payload.project_id,
        payload.name,
        payload.order,
        payload.inputs,
        payload.outputs,
    )
}

//
// DELETE
//
#[tauri::command]
pub fn delete_phase(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    PhaseService::delete(&mut db, id)
}
