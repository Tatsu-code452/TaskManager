use crate::db::database::Database;
use crate::define_service_composite;
use crate::model::task_plan_cell::{TaskPlanCell, TaskPlanCellRequest};

define_service_composite!(
    TaskPlanCellService,
    TaskPlanCell,
    TaskPlanCellRequest,
    list,
    create,
    update,
    delete,
    find_all_task_plan_cell,
    find_task_plan_cell,
    find_task_plan_cell_mut,
    add_task_plan_cell,
    delete_task_plan_cell,
    task_id,
    date
);
