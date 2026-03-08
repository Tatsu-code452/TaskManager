use crate::command::state::AppState;
use crate::model::task_actual_cell::TaskActualCell;
use crate::service::task_actual_cell_service::TaskActualCellService;
use tauri::State;

#[derive(serde::Deserialize)]
pub struct CreateActualCellRequest {
    pub task_id: String,
    pub date: String,
    pub hours: f64,
}

#[derive(serde::Deserialize)]
pub struct UpdateActualCellRequest {
    pub task_id: String,
    pub date: String,
    pub hours: Option<f64>,
}

#[tauri::command]
pub fn create_actual_cell(
    state: State<AppState>,
    payload: CreateActualCellRequest,
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
    payload: UpdateActualCellRequest,
) -> Result<TaskActualCell, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskActualCellService::update(&mut db, payload.task_id, payload.date, payload.hours)
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
