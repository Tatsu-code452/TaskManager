use crate::command::state::AppState;
use crate::model::task::{Task, TaskRequest};
use crate::service::task_service::TaskService;
use tauri::State;

//
// CREATE
//
#[tauri::command]
pub fn create_task(state: State<AppState>, payload: TaskRequest) -> Result<Task, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskService::create(&mut db, payload)
}

//
// READ
//
#[tauri::command]
pub fn get_task(state: State<AppState>, id: String) -> Result<Task, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    db.find_task(&id)
        .cloned()
        .ok_or_else(|| "Task not found".into())
}

//
// UPDATE
//
#[tauri::command]
pub fn update_task(state: State<AppState>, payload: TaskRequest) -> Result<Task, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskService::update(&mut db, payload)
}

//
// DELETE
//
#[tauri::command]
pub fn delete_task(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskService::delete(&mut db, id)
}
