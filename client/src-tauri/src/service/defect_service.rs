use crate::db::database::Database;
use crate::define_service_multiple_id;
use crate::model::defect::{Defect, DefectRequest};

define_service_multiple_id!(
    DefectService,
    Defect,
    DefectRequest,
    list,
    create,
    update,
    delete,
    find_defect_by_project,
    find_defect,
    find_defect_mut,
    add_defect,
    delete_defect,
    project_id,
    id
);
