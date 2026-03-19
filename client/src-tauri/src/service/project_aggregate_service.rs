use crate::db::database::Database;
use crate::service::phase_aggregate_service::PhaseAggregateService;
use chrono::NaiveDate;

pub struct ProjectAggregateService;

impl ProjectAggregateService {
    pub fn calculate_project_progress(db: &mut Database, project_id: &str) -> f64 {
        let phases = match db.find_phase_by_project(project_id) {
            Some(list) => list,
            None => return 0.0,
        };

        if phases.is_empty() {
            return 0.0;
        }

        let mut total = 0.0;
        let mut count = 0;

        for phase in phases {
            let progress =
                PhaseAggregateService::calculate_phase_progress(db, &project_id, &phase.id);
            total += progress;
            count += 1;
        }

        total / count as f64
    }

    pub fn count_issues(db: &Database, project_id: &str) -> usize {
        match db.find_issue_by_project(project_id) {
            Some(list) => list.len(),
            None => 0,
        }
    }

    pub fn count_defects(db: &Database, project_id: &str) -> usize {
        match db.find_defect_by_project(project_id) {
            Some(list) => list.len(),
            None => 0,
        }
    }

    pub fn find_delayed_tasks(db: &Database, project_id: &str) -> Vec<String> {
        let today = chrono::Local::now().date_naive();

        let tasks = match db.find_task_by_project(project_id) {
            Some(list) => list,
            None => return vec![],
        };

        tasks
            .into_iter()
            .filter(|t| {
                let planned_end = t
                    .planned_end
                    .as_deref()
                    .and_then(|s| NaiveDate::parse_from_str(s, "%Y-%m-%d").ok());
                if let Some(date) = planned_end {
                    date < today && t.progress_rate < 1.0
                } else {
                    false
                }
            })
            .map(|t| t.id.clone())
            .collect()
    }
}
