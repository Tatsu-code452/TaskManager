use crate::command::state::AppState;
use crate::db::database::Database;
use crate::define_command_single_id_impl;
use crate::define_tauri_commands_single_id;
use crate::model::project::ProjectSearchCondition;
use crate::model::project::{Project, ProjectRequest};
use crate::service::project_service::ProjectSearchResult;
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

impl ProjectCommand {
    pub fn search_impl(
        db: &Database,
        condition: ProjectSearchCondition,
    ) -> Result<ProjectSearchResult, String> {
        ProjectService::search(db, condition)
    }
}

#[tauri::command]
pub fn search_projects(
    state: tauri::State<AppState>,
    condition: ProjectSearchCondition,
) -> Result<ProjectSearchResult, String> {
    let db = state.db.lock().unwrap();
    ProjectCommand::search_impl(&db, condition)
}
