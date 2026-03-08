use crate::db::database::Database;
use crate::define_crud;
use crate::model::defect::Defect;

define_crud!(
    add_defect,
    find_defect,
    find_defect_mut,
    delete_defect,
    defects,
    defect_index,
    Defect
);
