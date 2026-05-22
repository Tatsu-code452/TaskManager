use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::task::{Task, TaskRequest};
use crate::service::task_service::{TaskModel, TaskService};

pub struct TaskCommand;

impl TaskCommand {
    pub fn list_impl(db: &Database, project_id: &str) -> Result<Vec<Task>, String> {
        TaskService::list(db, project_id)
    }

    pub fn create_impl(db: &mut Database, payload: &TaskRequest) -> Result<Task, String> {
        TaskService::create(db, payload)
    }

    pub fn update_impl(db: &mut Database, payload: &TaskRequest) -> Result<Task, String> {
        TaskService::update(db, payload)
    }

    pub fn delete_impl(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        TaskService::delete(db, project_id, id)
    }

    #[allow(non_snake_case)]
    pub fn fetch_task_and_cells_impl(
        db: &Database,
        projectId: &str,
    ) -> Result<Vec<TaskModel>, String> {
        TaskService::find_task_and_cells(db, projectId)
    }
}

#[tauri::command]
pub fn list_tasks(state: tauri::State<AppState>, project_id: String) -> Result<Vec<Task>, String> {
    let db = state.db.lock().unwrap();
    TaskCommand::list_impl(&db, &project_id)
}

#[tauri::command]
pub fn create_task(state: tauri::State<AppState>, payload: TaskRequest) -> Result<Task, String> {
    let mut db = state.db.lock().unwrap();
    TaskCommand::create_impl(&mut db, &payload)
}

#[tauri::command]
pub fn update_task(state: tauri::State<AppState>, payload: TaskRequest) -> Result<Task, String> {
    let mut db = state.db.lock().unwrap();
    TaskCommand::update_impl(&mut db, &payload)
}

#[tauri::command]
pub fn delete_task(
    state: tauri::State<AppState>,
    project_id: String,
    id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    TaskCommand::delete_impl(&mut db, &project_id, &id)
}

#[tauri::command]
#[allow(non_snake_case)]
pub fn fetch_task_and_cells(
    state: tauri::State<AppState>,
    projectId: &str,
) -> Result<Vec<TaskModel>, String> {
    let db = state.db.lock().unwrap();
    TaskCommand::fetch_task_and_cells_impl(&db, projectId)
}
