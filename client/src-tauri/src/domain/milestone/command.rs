use crate::{
    command::state::AppState,
    db::database::Database,
    domain::milestone::{
        model::{Milestone, MilestoneRequest},
        service::MilestoneService,
        summary::MilestoneSummary,
    },
};

pub struct MilestoneCommand;

impl MilestoneCommand {
    pub fn list_impl(db: &Database, project_id: &str) -> Result<Vec<Milestone>, String> {
        MilestoneService::list(db, project_id)
    }

    pub fn create_impl(db: &mut Database, payload: &MilestoneRequest) -> Result<Milestone, String> {
        MilestoneService::create(db, payload)
    }

    pub fn update_impl(db: &mut Database, payload: &MilestoneRequest) -> Result<Milestone, String> {
        MilestoneService::update(db, payload)
    }

    pub fn delete_impl(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        MilestoneService::delete(db, project_id, id)
    }
}

#[tauri::command]
pub fn list_milestones(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<Vec<Milestone>, String> {
    let db = state.db.lock().unwrap();
    MilestoneCommand::list_impl(&db, &project_id)
}

#[tauri::command]
pub fn create_milestone(
    state: tauri::State<AppState>,
    payload: MilestoneRequest,
) -> Result<Milestone, String> {
    let mut db = state.db.lock().unwrap();
    MilestoneCommand::create_impl(&mut db, &payload)
}

#[tauri::command]
pub fn update_milestone(
    state: tauri::State<AppState>,
    payload: MilestoneRequest,
) -> Result<Milestone, String> {
    let mut db = state.db.lock().unwrap();
    MilestoneCommand::update_impl(&mut db, &payload)
}

#[tauri::command]
pub fn delete_milestone(
    state: tauri::State<AppState>,
    project_id: String,
    id: String,
) -> Result<(), String> {
    let mut db = state.db.lock().unwrap();
    MilestoneCommand::delete_impl(&mut db, &project_id, &id)
}

#[tauri::command]
pub fn milestone_summary(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<MilestoneSummary, String> {
    let db = state.db.lock().unwrap();
    let rows = db.find_milestone_by_project(&project_id);
    Ok(MilestoneSummary::from_rows(&rows.unwrap()))
}
