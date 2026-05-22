use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::defect::{Defect, DefectRequest};
use crate::service::defect_service::DefectService;

pub struct DefectCommand;

impl DefectCommand {
    pub fn list_impl(db: &Database, project_id: &str) -> Result<Vec<Defect>, String> {
        DefectService::list(db, project_id)
    }

    pub fn create_impl(db: &mut Database, payload: &DefectRequest) -> Result<Defect, String> {
        DefectService::create(db, payload)
    }

    pub fn update_impl(db: &mut Database, payload: &DefectRequest) -> Result<Defect, String> {
        DefectService::update(db, payload)
    }

    pub fn delete_impl(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        DefectService::delete(db, project_id, id)
    }
}

#[tauri::command]
pub fn list_defects(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<Vec<Defect>, String> {
    let db = state.db.lock().unwrap();
    DefectCommand::list_impl(&db, &project_id)
}

#[tauri::command]
pub fn create_defect(
    state: tauri::State<AppState>,
    payload: DefectRequest,
) -> Result<Defect, String> {
    let mut db = state.db.lock().unwrap();
    DefectCommand::create_impl(&mut db, &payload)
}

#[tauri::command]
pub fn update_defect(
    state: tauri::State<AppState>,
    payload: DefectRequest,
) -> Result<Defect, String> {
    let mut db = state.db.lock().unwrap();
    DefectCommand::update_impl(&mut db, &payload)
}

#[tauri::command]
pub fn delete_defect(
    state: tauri::State<AppState>,
    project_id: String,
    id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    DefectCommand::delete_impl(&mut db, &project_id, &id)
}
