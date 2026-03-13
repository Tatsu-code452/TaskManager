use crate::command::state::AppState;
use crate::service::phase_aggregate_service::PhaseAggregateService;
use tauri::State;

#[tauri::command]
pub fn get_phase_progress(state: State<AppState>, phase_id: String) -> Result<f64, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;
    Ok(PhaseAggregateService::calculate_phase_progress(
        &mut db, &phase_id,
    ))
}
