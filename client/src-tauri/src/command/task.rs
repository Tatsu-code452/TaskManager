use crate::command::state::AppState;
use crate::model::task::{Task, TaskStatus};
use crate::service::task_service::TaskService;
use tauri::State;

#[derive(serde::Deserialize)]
pub struct CreateTaskRequest {
    pub project_id: String,
    pub phase_id: String,
    pub name: String,
    pub planned_start: String,
    pub planned_end: String,
    pub actual_start: Option<String>,
    pub actual_end: Option<String>,
    pub planned_hours: f64,
    pub actual_hours: f64,
    pub progress_rate: f64,
    pub status: TaskStatus,
}

#[derive(serde::Deserialize)]
pub struct UpdateTaskRequest {
    pub id: String,
    pub project_id: Option<String>,
    pub phase_id: Option<String>,
    pub name: Option<String>,
    pub planned_start: Option<String>,
    pub planned_end: Option<String>,
    pub actual_start: Option<String>,
    pub actual_end: Option<String>,
    pub planned_hours: Option<f64>,
    pub actual_hours: Option<f64>,
    pub progress_rate: Option<f64>,
    pub status: Option<TaskStatus>,
}

//
// CREATE
//
#[tauri::command]
pub fn create_task(state: State<AppState>, payload: CreateTaskRequest) -> Result<Task, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskService::create(
        &mut db,
        payload.project_id,
        payload.phase_id,
        payload.name,
        payload.planned_start,
        payload.planned_end,
        payload.actual_start,
        payload.actual_end,
        payload.planned_hours,
        payload.actual_hours,
        payload.progress_rate,
        payload.status,
    )
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
pub fn update_task(state: State<AppState>, payload: UpdateTaskRequest) -> Result<Task, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskService::update(
        &mut db,
        payload.id,
        payload.project_id,
        payload.phase_id,
        payload.name,
        payload.planned_start,
        payload.planned_end,
        payload.actual_start,
        payload.actual_end,
        payload.planned_hours,
        payload.actual_hours,
        payload.progress_rate,
        payload.status,
    )
}

//
// DELETE
//
#[tauri::command]
pub fn delete_task(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    TaskService::delete(&mut db, id)
}
