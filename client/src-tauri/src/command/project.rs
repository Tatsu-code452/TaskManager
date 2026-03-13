use crate::command::state::AppState;
use crate::model::milestone::{MilestoneRequest, MilestoneStatus, MILESTONE_TEMPLATE};
use crate::model::phase::{PhaseRequest, PHASE_TEMPLATE};
use crate::model::project::{Project, ProjectRequest, ProjectStatus};
use crate::model::task::{TaskRequest, TaskStatus, TASK_TEMPLATE};
use crate::service::milestone_service::MilestoneService;
use crate::service::phase_service::PhaseService;
use crate::service::project_service::ProjectService;
use crate::service::task_service::TaskService;
use tauri::State;

//
// CREATE
//
#[tauri::command]
pub fn create_project(state: State<AppState>, payload: ProjectRequest) -> Result<Project, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    let project_id = payload.id.clone();

    // 1. プロジェクト作成
    let project = ProjectService::create(&mut db, payload)?;

    // 2. Milestone 自動生成
    for (name, order) in MILESTONE_TEMPLATE {
        MilestoneService::create(
            &mut db,
            MilestoneRequest {
                id: format!("M{}", order),
                project_id: project_id.clone(),
                name: Some(name.to_string()),
                planned_start_date: None,
                planned_end_date: None,
                actual_start_date: None,
                actual_end_date: None,
                status: Some(MilestoneStatus::NotStarted),
            },
        )?;
    }

    // 3. Phase 自動生成
    for (name, order) in PHASE_TEMPLATE {
        PhaseService::create(
            &mut db,
            PhaseRequest {
                id: format!("P{}", order),
                project_id: project_id.clone(),
                name: Some(name.to_string()),
                order: Some((*order).try_into().unwrap()),
                inputs: Some(vec![]),
                outputs: Some(vec![]),
            },
        )?;
    }

    // 4. Task(WBS) 自動生成
    for (phase_name, tasks) in TASK_TEMPLATE {
        // Phase の order を取得
        if let Some((_, order)) = PHASE_TEMPLATE.iter().find(|(n, _)| n == phase_name) {
            let phase_id = format!("P{}", order);

            for (i, task_name) in tasks.iter().enumerate() {
                TaskService::create(
                    &mut db,
                    TaskRequest {
                        id: format!("T{}_{}", order, i + 1),
                        project_id: project_id.clone(),
                        phase_id: Some(phase_id.clone()),
                        name: Some(task_name.to_string()),
                        planned_start: Some("".into()),
                        planned_end: Some("".into()),
                        actual_start: Some("".into()),
                        actual_end: Some("".into()),
                        planned_hours: Some(0.0),
                        actual_hours: Some(0.0),
                        progress_rate: Some(0.0),
                        status: Some(TaskStatus::NotStarted),
                    },
                )?;
            }
        }
    }

    // 5. 最後にまとめて保存
    db.save_atomic()?;

    Ok(project)
}

//
// READ
//
#[tauri::command]
pub fn get_project(state: State<AppState>, id: String) -> Result<Project, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    db.find_project(&id)
        .cloned()
        .ok_or_else(|| "Project not found".into())
}

//
// UPDATE
//
#[tauri::command]
pub fn update_project(state: State<AppState>, payload: ProjectRequest) -> Result<Project, String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    ProjectService::update(&mut db, payload)
}

//
// DELETE
//
#[tauri::command]
pub fn delete_project(state: State<AppState>, id: String) -> Result<(), String> {
    let mut db = state.db.lock().map_err(|_| "lock error".to_string())?;

    ProjectService::delete(&mut db, id)
}

#[tauri::command]
pub fn search_projects(
    state: State<AppState>,
    name: Option<String>,
    client: Option<String>,
    status: Option<ProjectStatus>,
) -> Result<Vec<Project>, String> {
    let db = state.db.lock().map_err(|_| "lock error".to_string())?;

    let mut result = db.projects.clone();

    if let Some(name) = name {
        if !name.is_empty() {
            result = result
                .into_iter()
                .filter(|p| p.name.contains(&name))
                .collect();
        }
    }

    if let Some(client) = client {
        if !client.is_empty() {
            result = result
                .into_iter()
                .filter(|p| p.client.contains(&client))
                .collect();
        }
    }

    if let Some(status) = status {
        if status != ProjectStatus::All {
            result = result.into_iter().filter(|p| p.status == status).collect();
        }
    }

    Ok(result)
}
