use crate::command::state::AppState;
use crate::model::milestone::{Milestone, MilestoneStatus};
use crate::service::milestone_service::MilestoneService;
use tauri::State;

#[derive(serde::Deserialize)]
pub struct CreateMilestoneRequest {
    pub id: String,
    pub project_id: String,
    pub name: String,
    pub planned_start_date: String,
    pub planned_end_date: String,
}

#[derive(serde::Deserialize)]
pub struct UpdateMilestoneRequest {
    pub id: String,
    pub name: Option<String>,
    pub planned_start_date: Option<String>,
    pub planned_end_date: Option<String>,
    pub actual_start_date: Option<String>,
    pub actual_end_date: Option<String>,
    pub status: Option<MilestoneStatus>,
}

//
// CREATE
//
#[tauri::command]
pub fn create_milestone(
    state: State<AppState>,
    payload: CreateMilestoneRequest,
) -> Result<Milestone, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    MilestoneService::create(
        &mut db,
        payload.id,
        payload.project_id,
        payload.name,
        payload.planned_start_date,
        payload.planned_end_date,
    )
}

//
// READ
//
#[tauri::command]
pub fn get_milestone(state: State<AppState>, id: String) -> Result<Milestone, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    db.find_milestone(&id)
        .cloned()
        .ok_or_else(|| "Milestone not found".into())
}

//
// UPDATE
//
#[tauri::command]
pub fn update_milestone(
    state: State<AppState>,
    payload: UpdateMilestoneRequest,
) -> Result<Milestone, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    MilestoneService::update(
        &mut db,
        payload.id,
        payload.name,
        payload.planned_start_date,
        payload.planned_end_date,
        payload.actual_start_date,
        payload.actual_end_date,
        payload.status,
    )
}

//
// DELETE
//
#[tauri::command]
pub fn delete_milestone(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    MilestoneService::delete(&mut db, id)
}
