use crate::{db::database::Database, define_crud_composite, model::task_plan_cell::TaskPlanCell};

impl Database {
    define_crud_composite!(
        add_task_plan_cell,
        find_task_plan_cell,
        find_task_plan_cell_mut,
        find_all_task_plan_cell,
        update_task_plan_cell,
        delete_task_plan_cell,
        task_plan_cells, // ← フィールド名
        TaskPlanCell,    // ← 型名
        task_id,
        date
    );
}
