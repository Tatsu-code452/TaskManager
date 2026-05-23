#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
extern crate app_lib;

use app_lib::command::state::AppState;
use app_lib::domain::{
    defect, issue, milestone, phase, project, task, task_actual_cell, task_plan_cell,
};

fn main() {
    tauri::Builder::default()
        .manage(AppState::new())
        .invoke_handler(tauri::generate_handler![
            // Project
            project::command::list_projects,
            project::command::create_project,
            project::command::update_project,
            project::command::delete_project,
            project::command::search_projects,
            // Phase
            phase::command::list_phases,
            phase::command::create_phase,
            phase::command::update_phase,
            phase::command::delete_phase,
            // Milestone
            milestone::command::list_milestones,
            milestone::command::create_milestone,
            milestone::command::update_milestone,
            milestone::command::delete_milestone,
            // Task
            task::command::list_tasks,
            task::command::create_task,
            task::command::update_task,
            task::command::delete_task,
            task::command::fetch_task_and_cells,
            // Issue
            issue::command::list_issues,
            issue::command::create_issue,
            issue::command::update_issue,
            issue::command::delete_issue,
            // Defect
            defect::command::list_defects,
            defect::command::create_defect,
            defect::command::update_defect,
            defect::command::delete_defect,
            // TaskPlanCell
            task_plan_cell::command::list_task_plan_cells,
            task_plan_cell::command::create_task_plan_cell,
            task_plan_cell::command::update_task_plan_cell,
            task_plan_cell::command::delete_task_plan_cell,
            // TaskActualCell
            task_actual_cell::command::list_task_actual_cells,
            task_actual_cell::command::create_task_actual_cell,
            task_actual_cell::command::update_task_actual_cell,
            task_actual_cell::command::delete_task_actual_cell,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
