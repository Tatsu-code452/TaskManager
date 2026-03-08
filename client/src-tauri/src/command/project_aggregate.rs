use crate::command::state::AppState;
use crate::service::project_aggregate_service::ProjectAggregateService;
use tauri::State;

#[tauri::command]
pub fn get_project_progress(state: State<AppState>, project_id: String) -> Result<f64, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(ProjectAggregateService::calculate_project_progress(
        &db,
        &project_id,
    ))
}

#[tauri::command]
pub fn get_project_issue_count(
    state: State<AppState>,
    project_id: String,
) -> Result<usize, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(ProjectAggregateService::count_issues(&db, &project_id))
}

#[tauri::command]
pub fn get_project_defect_count(
    state: State<AppState>,
    project_id: String,
) -> Result<usize, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(ProjectAggregateService::count_defects(&db, &project_id))
}

#[tauri::command]
pub fn get_project_delayed_tasks(
    state: State<AppState>,
    project_id: String,
) -> Result<Vec<String>, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(ProjectAggregateService::find_delayed_tasks(
        &db,
        &project_id,
    ))
}
