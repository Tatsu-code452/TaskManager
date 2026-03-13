use crate::command::state::AppState;
use crate::model::milestone::{Milestone, MilestoneRequest};
use crate::service::milestone_service::MilestoneService;
use tauri::State;

//
// READ
//
#[tauri::command]
pub fn list_milestones(
    state: State<AppState>,
    project_id: String,
) -> Result<Vec<Milestone>, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    MilestoneService::list(&mut db, project_id)
}

//
// CREATE
//
#[tauri::command]
pub fn create_milestone(
    state: State<AppState>,
    payload: MilestoneRequest,
) -> Result<Milestone, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    MilestoneService::create(&mut db, payload)
}

//
// UPDATE
//
#[tauri::command]
pub fn update_milestone(
    state: State<AppState>,
    payload: MilestoneRequest,
) -> Result<Milestone, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    MilestoneService::update(&mut db, payload)
}

//
// DELETE
//
#[tauri::command]
pub fn delete_milestone(
    state: State<AppState>,
    id: String,
    project_id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    MilestoneService::delete(&mut db, id, project_id)
}
