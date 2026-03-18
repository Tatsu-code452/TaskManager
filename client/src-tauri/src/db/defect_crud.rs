use crate::db::database::Database;
use crate::define_crud_multiple_id;
use crate::model::defect::Defect;

impl Database {
    define_crud_multiple_id!(
        add_defect,
        update_defect,
        delete_defect,
        find_defect,
        find_defect_mut,
        find_defect_by_project,
        next_defect_id,
        rebuild_defect_index,
        defects,
        defect_index,
        row,
        Defect,
        project_id,
        id,
        "DEFECT-"
    );
}
