use crate::command::state::AppState;
use crate::db::database::Database;
use crate::define_command_single_id_impl;
use crate::define_tauri_commands_single_id;
use crate::model::project::{Project, ProjectRequest};
use crate::service::project_service::ProjectService;

define_command_single_id_impl!(
    ProjectCommand,
    ProjectService,
    ProjectRequest,
    Project,
    list,
    create,
    update,
    delete
);

define_tauri_commands_single_id!(
    ProjectCommand,
    ProjectRequest,
    Project,
    list_projects,
    create_project,
    update_project,
    delete_project
);
