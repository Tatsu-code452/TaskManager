use crate::command::state::AppState;
use crate::model::task_actual_cell::{TaskActualCell, TaskActualCellRequest};
use crate::service::task_actual_cell_service::TaskActualCellService;
use tauri::State;

#[tauri::command]
pub fn create_actual_cell(
    state: State<AppState>,
    payload: TaskActualCellRequest,
) -> Result<TaskActualCell, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskActualCellService::create(&mut db, payload.task_id, payload.date, payload.hours)
}

#[tauri::command]
pub fn get_actual_cells(
    state: State<AppState>,
    task_id: String,
) -> Result<Vec<TaskActualCell>, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(TaskActualCellService::read_all(&db, task_id))
}

#[tauri::command]
pub fn update_actual_cell(
    state: State<AppState>,
    payload: TaskActualCellRequest,
) -> Result<TaskActualCell, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskActualCellService::update(&mut db, payload.task_id, payload.date, Some(payload.hours))
}

#[tauri::command]
pub fn delete_actual_cell(
    state: State<AppState>,
    task_id: String,
    date: String,
) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskActualCellService::delete(&mut db, task_id, date)
}
