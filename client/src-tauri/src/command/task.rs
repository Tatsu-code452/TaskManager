use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::task::{Task, TaskRequest};
use crate::service::task_service::{TaskModel, TaskService};
use crate::{define_command_multiple_id, define_tauri_commands_multiple_id};

define_command_multiple_id!(
    TaskCommand,
    TaskService,
    TaskRequest,
    Task,
    list,
    create,
    update,
    delete
);

define_tauri_commands_multiple_id!(
    TaskCommand,
    TaskRequest,
    Task,
    list_tasks,
    create_task,
    update_task,
    delete_task
);

impl TaskCommand {
    #[allow(non_snake_case)]
    pub fn fetch_task_and_cells_impl(
        db: &Database,
        projectId: &str,
    ) -> Result<Vec<TaskModel>, String> {
        TaskService::find_task_and_cells(db, projectId)
    }
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
