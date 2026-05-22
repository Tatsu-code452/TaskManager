use crate::{command::state::AppState, service::milestone_summary_service::MilestoneSummary};

#[tauri::command]
pub fn milestone_summary(
    state: tauri::State<AppState>,
    project_id: String,
) -> Result<MilestoneSummary, String> {
    let db = state.db.lock().unwrap();
    let rows = db.find_milestone_by_project(&project_id);
    Ok(MilestoneSummary::from_rows(&rows.unwrap()))
}
