use crate::command::state::AppState;
use crate::service::phase_aggregate_service::PhaseAggregateService;
use tauri::State;

#[tauri::command]
pub fn get_phase_progress(
    state: State<AppState>,
    project_id: String,
    phase_id: String,
) -> Result<f64, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    let result = PhaseAggregateService::calculate_phase_progress(
        &mut db,
        project_id.as_str(),
        phase_id.as_str(),
    );
    Ok(result)
}
