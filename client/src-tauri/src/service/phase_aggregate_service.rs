use crate::{db::database::Database, model::task::Task};

pub struct PhaseAggregateService;

impl PhaseAggregateService {
    pub fn calculate_phase_progress(db: &mut Database, project_id: &str, phase_id: &str) -> f64 {
        // Option<Vec<Task>> を安全に取り出す
        let tasks = match db.find_task_by_project(project_id) {
            Some(list) => list,
            None => return 0.0,
        };

        // phase_id でフィルタ
        let tasks: Vec<Task> = tasks
            .into_iter()
            .filter(|t| t.phase_id == phase_id)
            .collect();

        if tasks.is_empty() {
            return 0.0;
        }

        let total: f64 = tasks.iter().map(|t| t.progress_rate).sum();

        total / tasks.len() as f64
    }
}
