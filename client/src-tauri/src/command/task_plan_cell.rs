use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::task_plan_cell::{TaskPlanCell, TaskPlanCellRequest};
use crate::service::task_plan_cell_service::TaskPlanCellService;
use crate::{define_command_composite_impl, define_tauri_commands_composite};

define_command_composite_impl!(
    TaskPlanCellCommand,
    TaskPlanCellService,
    TaskPlanCellRequest,
    TaskPlanCell,
    list,
    create,
    update,
    delete,
    taskId,
    date
);

define_tauri_commands_composite!(
    TaskPlanCellCommand,
    TaskPlanCellRequest,
    TaskPlanCell,
    list_task_plan_cells,
    create_task_plan_cell,
    update_task_plan_cell,
    delete_task_plan_cell,
    taskId,
    date
);
