use crate::db::database::Database;
use crate::define_service_single_id;
use crate::model::project::{Project, ProjectRequest};

define_service_single_id!(
    ProjectService,
    Project,
    ProjectRequest,
    list,
    create,
    update,
    delete,
    find_project,
    find_project_mut,
    find_all_project,
    add_project,
    delete_project,
    id
);
