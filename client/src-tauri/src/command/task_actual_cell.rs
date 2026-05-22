use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::task_actual_cell::{TaskActualCell, TaskActualCellRequest};
use crate::service::task_actual_cell_service::TaskActualCellService;

pub struct TaskActualCommand;

impl TaskActualCommand {
    pub fn list_impl(db: &Database, project_id: &str) -> Result<Vec<TaskActualCell>, String> {
        TaskActualCellService::list(db, project_id)
    }

    pub fn create_impl(
        db: &mut Database,
        payload: &TaskActualCellRequest,
    ) -> Result<TaskActualCell, String> {
        TaskActualCellService::create(db, payload.clone())
    }

    pub fn update_impl(
        db: &mut Database,
        payload: &TaskActualCellRequest,
    ) -> Result<TaskActualCell, String> {
        TaskActualCellService::update(db, payload.clone())
    }

    pub fn delete_impl(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        TaskActualCellService::delete(db, project_id, id)
    }
}

#[tauri::command]
pub fn list_task_actual_cells(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<Vec<TaskActualCell>, String> {
    let db = state.db.lock().unwrap();
    TaskActualCommand::list_impl(&db, &project_id)
}

#[tauri::command]
pub fn create_task_actual_cell(
    state: tauri::State<AppState>,
    payload: TaskActualCellRequest,
) -> Result<TaskActualCell, String> {
    let mut db = state.db.lock().unwrap();
    TaskActualCommand::create_impl(&mut db, &payload)
}

#[tauri::command]
pub fn update_task_actual_cell(
    state: tauri::State<AppState>,
    payload: TaskActualCellRequest,
) -> Result<TaskActualCell, String> {
    let mut db = state.db.lock().unwrap();
    TaskActualCommand::update_impl(&mut db, &payload)
}

#[tauri::command]
pub fn delete_task_actual_cell(
    state: tauri::State<AppState>,
    project_id: String,
    id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    TaskActualCommand::delete_impl(&mut db, &project_id, &id)
}
