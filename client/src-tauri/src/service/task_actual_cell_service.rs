use crate::db::database::Database;
use crate::define_service_composite;
use crate::model::task_actual_cell::{TaskActualCell, TaskActualCellRequest};

define_service_composite!(
    TaskActualCellService,
    TaskActualCell,
    TaskActualCellRequest,
    list,
    create,
    update,
    delete,
    find_all_task_actual_cell,
    find_task_actual_cell,
    find_task_actual_cell_mut,
    add_task_actual_cell,
    delete_task_actual_cell,
    task_id,
    date
);
