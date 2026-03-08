use crate::command::state::AppState;
use crate::service::phase_aggregate_service::PhaseAggregateService;
use tauri::State;

#[tauri::command]
pub fn get_phase_progress(state: State<AppState>, phase_id: String) -> Result<f64, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(PhaseAggregateService::calculate_phase_progress(
        &db, &phase_id,
    ))
}
