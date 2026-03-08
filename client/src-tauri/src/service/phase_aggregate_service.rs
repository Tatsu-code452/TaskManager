use crate::db::database::Database;

pub struct PhaseAggregateService;

impl PhaseAggregateService {
    pub fn calculate_phase_progress(db: &Database, phase_id: &str) -> f64 {
        let tasks = db.read_all_tasks_by_phase(phase_id);

        if tasks.is_empty() {
            return 0.0;
        }

        let total: f64 = tasks.iter().map(|t| t.progress_rate).sum();
        total / tasks.len() as f64
    }
}
