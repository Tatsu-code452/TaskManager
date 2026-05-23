use chrono::NaiveDate;
use serde::Serialize;

use crate::domain::milestone::model::{Milestone, MilestoneStatus};

#[derive(Serialize)]
pub struct MilestoneSummary {
    pub completed: usize,
    pub in_progress: usize,
    pub not_started: usize,
    pub delayed: usize,

    pub avg_progress: f64,
    pub median_progress: f64,
    pub max_progress: u32,
    pub min_progress: u32,

    pub next_milestone: Option<Milestone>,
}

impl MilestoneSummary {
    pub fn from_rows(rows: &[Milestone]) -> Self {
        let today = chrono::Local::now().date_naive();

        let (completed, in_progress, not_started) = count_status(rows);
        let delayed = count_delayed(rows, today);
        let next_milestone = find_next(rows);
        let (avg_progress, median_progress, max_progress, min_progress) = calc_progress_stats(rows);

        Self {
            completed,
            in_progress,
            not_started,
            delayed,
            avg_progress,
            median_progress: median_progress as f64,
            max_progress,
            min_progress,
            next_milestone,
        }
    }
}

fn count_status(rows: &[Milestone]) -> (usize, usize, usize) {
    let completed = rows
        .iter()
        .filter(|m| m.status == MilestoneStatus::Completed)
        .count();
    let in_progress = rows
        .iter()
        .filter(|m| m.status == MilestoneStatus::InProgress)
        .count();
    let not_started = rows
        .iter()
        .filter(|m| m.status == MilestoneStatus::Open)
        .count();
    (completed, in_progress, not_started)
}

fn count_delayed(rows: &[Milestone], today: NaiveDate) -> usize {
    rows.iter()
        .filter(|m| {
            if m.status == MilestoneStatus::Completed {
                return false;
            }
            m.end_date
                .as_ref()
                .and_then(|s| NaiveDate::parse_from_str(s, "%Y-%m-%d").ok())
                .map(|end| end < today)
                .unwrap_or(false)
        })
        .count()
}

fn find_next(rows: &[Milestone]) -> Option<Milestone> {
    rows.iter()
        .filter_map(|m| {
            m.end_date.as_ref().and_then(|s| {
                NaiveDate::parse_from_str(s, "%Y-%m-%d")
                    .ok()
                    .map(|end| (m, end))
            })
        })
        .min_by_key(|(_, end)| *end)
        .map(|(m, _)| m.clone())
}

fn calc_progress_stats(rows: &[Milestone]) -> (f64, f64, u32, u32) {
    let mut progresses: Vec<u32> = rows.iter().map(|m| m.progress as u32).collect();
    progresses.sort();

    let avg = progresses.iter().sum::<u32>() as f64 / progresses.len().max(1) as f64;
    let median = progresses.get(progresses.len() / 2).cloned().unwrap_or(0);
    let max = *progresses.iter().max().unwrap_or(&0);
    let min = *progresses.iter().min().unwrap_or(&0);

    (avg, median as f64, max, min)
}
