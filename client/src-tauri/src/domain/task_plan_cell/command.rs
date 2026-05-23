use crate::{
    command::state::AppState,
    db::database::Database,
    domain::task_plan_cell::{
        model::{TaskPlanCell, TaskPlanCellRequest},
        service::TaskPlanCellService,
    },
};

pub struct TaskPlanCommand;

impl TaskPlanCommand {
    pub fn list_impl(db: &Database, project_id: &str) -> Result<Vec<TaskPlanCell>, String> {
        TaskPlanCellService::list(db, project_id)
    }

    pub fn create_impl(
        db: &mut Database,
        payload: &TaskPlanCellRequest,
    ) -> Result<TaskPlanCell, String> {
        TaskPlanCellService::create(db, payload.clone())
    }

    pub fn update_impl(
        db: &mut Database,
        payload: &TaskPlanCellRequest,
    ) -> Result<TaskPlanCell, String> {
        TaskPlanCellService::update(db, payload.clone())
    }

    pub fn delete_impl(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        TaskPlanCellService::delete(db, project_id, id)
    }
}

#[tauri::command]
pub fn list_task_plan_cells(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<Vec<TaskPlanCell>, String> {
    let db = state.db.lock().unwrap();
    TaskPlanCommand::list_impl(&db, &project_id)
}

#[tauri::command]
pub fn create_task_plan_cell(
    state: tauri::State<AppState>,
    payload: TaskPlanCellRequest,
) -> Result<TaskPlanCell, String> {
    let mut db = state.db.lock().unwrap();
    TaskPlanCommand::create_impl(&mut db, &payload)
}

#[tauri::command]
pub fn update_task_plan_cell(
    state: tauri::State<AppState>,
    payload: TaskPlanCellRequest,
) -> Result<TaskPlanCell, String> {
    let mut db = state.db.lock().unwrap();
    TaskPlanCommand::update_impl(&mut db, &payload)
}

#[tauri::command]
pub fn delete_task_plan_cell(
    state: tauri::State<AppState>,
    project_id: String,
    id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    TaskPlanCommand::delete_impl(&mut db, &project_id, &id)
}
