use crate::command::state::AppState;
use crate::db::database::Database;
use crate::{define_command_multiple_id, define_tauri_commands_multiple_id};
use crate::model::task::{Task, TaskRequest};
use crate::service::task_service::TaskService;

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
