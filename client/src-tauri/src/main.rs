#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
extern crate app_lib;

mod command;
mod db;
mod model;
mod service;
mod util;

use crate::command::state::AppState;

fn main() {
    tauri::Builder::default()
        .manage(AppState::new())
        .invoke_handler(tauri::generate_handler![
            // Project
            command::project::create_project,
            command::project::get_project,
            command::project::update_project,
            command::project::delete_project,
            command::project::search_projects,
            // Phase
            command::phase::create_phase,
            command::phase::get_phase,
            command::phase::update_phase,
            command::phase::delete_phase,
            // Milestone
            command::milestone::create_milestone,
            command::milestone::list_milestones,
            command::milestone::update_milestone,
            command::milestone::delete_milestone,
            // Task
            command::task::create_task,
            command::task::get_task,
            command::task::update_task,
            command::task::delete_task,
            // Issue
            command::issue::create_issue,
            command::issue::list_issues,
            command::issue::update_issue,
            command::issue::delete_issue,
            // Defect
            command::defect::create_defect,
            command::defect::list_defects,
            command::defect::update_defect,
            command::defect::delete_defect,
            // TaskPlanCell
            command::task_plan_cell::create_plan_cell,
            command::task_plan_cell::update_plan_cell,
            command::task_plan_cell::delete_plan_cell,
            command::task_plan_cell::get_plan_cells,
            // TaskActualCell
            command::task_actual_cell::create_actual_cell,
            command::task_actual_cell::update_actual_cell,
            command::task_actual_cell::delete_actual_cell,
            command::task_actual_cell::get_actual_cells,
            // Phase 集計
            command::phase_aggregate::get_phase_progress,
            // Project 集計
            command::project_aggregate::get_project_progress,
            command::project_aggregate::get_project_issue_count,
            command::project_aggregate::get_project_defect_count,
            command::project_aggregate::get_project_delayed_tasks,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
