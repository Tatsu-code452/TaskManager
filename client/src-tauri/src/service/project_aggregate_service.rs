use crate::db::database::Database;

pub struct ProjectAggregateService;

impl ProjectAggregateService {
    pub fn calculate_project_progress(db: &Database, project_id: &str) -> f64 {
        let phases = db.read_all_phases_by_project(project_id);

        if phases.is_empty() {
            return 0.0;
        }

        let mut total = 0.0;
        let mut count = 0;

        for phase in phases {
            let progress =
                super::phase_aggregate_service::PhaseAggregateService::calculate_phase_progress(
                    db, &phase.id,
                );
            total += progress;
            count += 1;
        }

        total / count as f64
    }
}

impl ProjectAggregateService {
    pub fn count_issues(db: &Database, project_id: &str) -> usize {
        db.issues
            .iter()
            .filter(|i| i.project_id == project_id)
            .count()
    }

    pub fn count_defects(db: &Database, project_id: &str) -> usize {
        db.defects
            .iter()
            .filter(|d| d.project_id == project_id)
            .count()
    }
}

use chrono::NaiveDate;

impl ProjectAggregateService {
    pub fn find_delayed_tasks(db: &Database, project_id: &str) -> Vec<String> {
        let today = chrono::Local::now().date_naive();

        db.tasks
            .iter()
            .filter(|t| t.project_id == project_id)
            .filter(|t| {
                let planned_end = NaiveDate::parse_from_str(&t.planned_end, "%Y-%m-%d").unwrap();
                planned_end < today && t.progress_rate < 1.0
            })
            .map(|t| t.id.clone())
            .collect()
    }
}
