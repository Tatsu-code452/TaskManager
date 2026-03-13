use crate::command::state::AppState;
use crate::model::task_plan_cell::{TaskPlanCell, TaskPlanCellRequest};
use crate::service::task_plan_cell_service::TaskPlanCellService;
use tauri::State;

#[tauri::command]
pub fn create_plan_cell(
    state: State<AppState>,
    payload: TaskPlanCellRequest,
) -> Result<TaskPlanCell, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskPlanCellService::create(&mut db, payload.task_id, payload.date, payload.hours)
}

#[tauri::command]
pub fn get_plan_cells(
    state: State<AppState>,
    task_id: String,
) -> Result<Vec<TaskPlanCell>, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(TaskPlanCellService::read_all(&db, task_id))
}

#[tauri::command]
pub fn update_plan_cell(
    state: State<AppState>,
    payload: TaskPlanCellRequest,
) -> Result<TaskPlanCell, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskPlanCellService::update(&mut db, payload.task_id, payload.date, Some(payload.hours))
}

#[tauri::command]
pub fn delete_plan_cell(
    state: State<AppState>,
    task_id: String,
    date: String,
) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskPlanCellService::delete(&mut db, task_id, date)
}
