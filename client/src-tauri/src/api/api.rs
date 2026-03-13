use crate::db::db_action::{filter_tasks, load_db, save_db, update_cell_in_db, update_task_in_db};
use crate::db::tasks_action::create_tasks_in_db;
use crate::model::api::{TaskApiResponse, CreateTasksRequest, UpdateCellRequest, UpdateTaskRequest};

/* ------------------------------
   Tauri Commands
------------------------------ */

#[tauri::command]
pub fn fetch_tasks(from: String, to: String) -> Result<Vec<TaskApiResponse>, String> {
    let db = load_db()?;
    Ok(filter_tasks(&db, &from, &to))
}

#[tauri::command]
pub fn create_tasks(params: CreateTasksRequest) -> Result<(), String> {
    let mut db = load_db()?;
    create_tasks_in_db(&mut db, &params);
    save_db(&db)?;
    Ok(())
}

#[tauri::command]
pub fn update_task(task_id: String, param: UpdateTaskRequest) -> Result<(), String> {
    let mut db = load_db()?;
    update_task_in_db(&mut db, &task_id, &param);
    save_db(&db)?;
    Ok(())
}

#[tauri::command]
pub fn update_cell(task_id: String, param: UpdateCellRequest) -> Result<(), String> {
    let mut db = load_db()?;
    update_cell_in_db(&mut db, &task_id, &param);
    save_db(&db)?;
    Ok(())
}
