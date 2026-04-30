use crate::{
    db::database::Database, define_crud_composite, model::task_actual_cell::TaskActualCell,
};

impl Database {
    define_crud_composite!(
        add_task_actual_cell,
        find_task_actual_cell,
        find_task_actual_cell_mut,
        find_all_task_actual_cell,
        update_task_actual_cell,
        delete_task_actual_cell,
        task_actual_cells, // ← フィールド名
        TaskActualCell,    // ← 型名
        task_id,
        date
    );
}
