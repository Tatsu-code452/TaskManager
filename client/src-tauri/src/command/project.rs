use crate::command::state::AppState;
use crate::db::database::Database;
use crate::model::project::ProjectSearchCondition;
use crate::model::project::{Project, ProjectRequest};
use crate::service::project_service::ProjectSearchResult;
use crate::service::project_service::ProjectService;

pub struct ProjectCommand;

impl ProjectCommand {
    pub fn list_impl(db: &Database) -> Result<Vec<Project>, String> {
        ProjectService::list(db)
    }

    pub fn create_impl(db: &mut Database, payload: ProjectRequest) -> Result<Project, String> {
        ProjectService::create(db, payload)
    }

    pub fn update_impl(db: &mut Database, payload: ProjectRequest) -> Result<Project, String> {
        ProjectService::update(db, payload)
    }

    pub fn delete_impl(db: &mut Database, id: String) -> Result<(), String> {
        ProjectService::delete(db, id)
    }

    pub fn search_impl(
        db: &Database,
        condition: ProjectSearchCondition,
    ) -> Result<ProjectSearchResult, String> {
        ProjectService::search(db, condition)
    }
}

#[tauri::command]
pub fn list_projects(state: tauri::State<AppState>) -> Result<Vec<Project>, String> {
    let db = state.db.lock().unwrap();
    ProjectCommand::list_impl(&db)
}

#[tauri::command]
pub fn create_project(
    state: tauri::State<AppState>,
    payload: ProjectRequest,
) -> Result<Project, String> {
    let mut db = state.db.lock().unwrap();
    ProjectCommand::create_impl(&mut db, payload)
}

#[tauri::command]
pub fn update_project(
    state: tauri::State<AppState>,
    payload: ProjectRequest,
) -> Result<Project, String> {
    let mut db = state.db.lock().unwrap();
    ProjectCommand::update_impl(&mut db, payload)
}

#[tauri::command]
pub fn delete_project(state: tauri::State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    ProjectCommand::delete_impl(&mut db, id)
}

#[tauri::command]
pub fn search_projects(
    state: tauri::State<AppState>,
    condition: ProjectSearchCondition,
) -> Result<ProjectSearchResult, String> {
    let db = state.db.lock().unwrap();
    ProjectCommand::search_impl(&db, condition)
}
