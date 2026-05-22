use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::phase::{Phase, PhaseRequest};
use crate::service::phase_service::PhaseService;

pub struct PhaseCommand;

impl PhaseCommand {
    pub fn list_impl(db: &Database, project_id: &str) -> Result<Vec<Phase>, String> {
        PhaseService::list(db, project_id)
    }

    pub fn create_impl(db: &mut Database, payload: &PhaseRequest) -> Result<Phase, String> {
        PhaseService::create(db, payload)
    }

    pub fn update_impl(db: &mut Database, payload: &PhaseRequest) -> Result<Phase, String> {
        PhaseService::update(db, payload)
    }

    pub fn delete_impl(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        PhaseService::delete(db, project_id, id)
    }
}

#[tauri::command]
pub fn list_phases(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<Vec<Phase>, String> {
    let db = state.db.lock().unwrap();
    PhaseCommand::list_impl(&db, &project_id)
}

#[tauri::command]
pub fn create_phase(state: tauri::State<AppState>, payload: PhaseRequest) -> Result<Phase, String> {
    let mut db = state.db.lock().unwrap();
    PhaseCommand::create_impl(&mut db, &payload)
}

#[tauri::command]
pub fn update_phase(state: tauri::State<AppState>, payload: PhaseRequest) -> Result<Phase, String> {
    let mut db = state.db.lock().unwrap();
    PhaseCommand::update_impl(&mut db, &payload)
}

#[tauri::command]
pub fn delete_phase(
    state: tauri::State<AppState>,
    project_id: String,
    id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    PhaseCommand::delete_impl(&mut db, &project_id, &id)
}
