use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::task_actual_cell::{TaskActualCell, TaskActualCellRequest};
use crate::service::task_actual_cell_service::TaskActualCellService;
use crate::{define_command_composite_impl, define_tauri_commands_composite};

define_command_composite_impl!(
    TaskActualCellCommand,
    TaskActualCellService,
    TaskActualCellRequest,
    TaskActualCell,
    list,
    create,
    update,
    delete,
    taskId,
    date
);

define_tauri_commands_composite!(
    TaskActualCellCommand,
    TaskActualCellRequest,
    TaskActualCell,
    list_task_actual_cells,
    create_task_actual_cell,
    update_task_actual_cell,
    delete_task_actual_cell,
    taskId,
    date
);
