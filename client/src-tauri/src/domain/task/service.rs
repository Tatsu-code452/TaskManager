use crate::{
    db::database::Database,
    domain::{
        task::model::{Task, TaskRequest},
        task_actual_cell::model::TaskActualCell,
        task_plan_cell::model::TaskPlanCell,
    },
    service::search_utils::{JoinType, SearchBuilder},
};
use serde::{Deserialize, Serialize};

pub struct TaskService;

impl TaskService {
    pub fn list(db: &Database, project_id: &str) -> Result<Vec<Task>, String> {
        if project_id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        db.find_task_by_project(&project_id)
            .ok_or_else(|| "Not found".to_string())
    }

    pub fn create(db: &mut Database, payload: &TaskRequest) -> Result<Task, String> {
        if payload.project_id.trim().is_empty() {
            return Err("Key is empty".into());
        }

        // new(id, project_id)
        let mut item = Task::default();
        item.id = db.next_task_id();
        item.apply_request(&payload);

        db.add_task(&item)
            .ok_or_else(|| "Failed to add".to_string())?;

        db.save_atomic()?;
        Ok(item)
    }

    pub fn update(db: &mut Database, payload: &TaskRequest) -> Result<Task, String> {
        let keys = [payload.project_id.clone(), payload.id.clone()];
        if keys.iter().any(|v| v.trim().is_empty()) {
            return Err("Key is empty".into());
        }

        {
            let item = db
                .find_task_mut(&payload.project_id, &payload.id)
                .ok_or_else(|| "Not found".to_string())?;

            item.apply_request(&payload);
            item.timestamps.touch();
        }

        db.save_atomic()?;

        Ok(db
            .find_task(&payload.project_id, &payload.id)
            .unwrap()
            .clone())
    }

    pub fn delete(db: &mut Database, project_id: &str, id: &str) -> Result<(), String> {
        let keys = [project_id, id];

        if keys.iter().any(|v| v.trim().is_empty()) {
            return Err("Key is empty".into());
        }

        db.delete_task(project_id, id)
            .ok_or_else(|| "Not found".to_string())?;

        db.save_atomic()?;
        Ok(())
    }

    pub fn find_task_and_cells(db: &Database, project_id: &str) -> Result<Vec<TaskModel>, String> {
        let project_id = project_id.to_string();
        let filtered_tasks = SearchBuilder::new(db.tasks.clone())
            .and_filter(move |t| t.project_id == project_id)
            .execute();

        let tasks = SearchBuilder::new(filtered_tasks.clone())
            .join(JoinType::Left, db.task_plan_cells.clone(), |t, p| {
                t.id == p.task_id
            })
            .join(JoinType::Left, db.task_actual_cells.clone(), |jp, a| {
                jp.left.id == a.task_id
            })
            .execute();

        let res = tasks
            .into_iter()
            .map(|joined| {
                let task = joined.left.left; // Task
                let plan = joined.left.right; // Vec<TaskPlanCell>
                let actual = joined.right; // Vec<TaskActualCell>

                TaskModel::from_rows(task, plan, actual)
            })
            .collect::<Vec<TaskModel>>();

        Ok(res)
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct TaskModel {
    pub task: Task,
    pub plan: Vec<TaskPlanCell>,
    pub actual: Vec<TaskActualCell>,
}

impl TaskModel {
    pub fn from_rows(
        task: Task,
        plan_cells: Vec<TaskPlanCell>,
        actual_cells: Vec<TaskActualCell>,
    ) -> Self {
        Self {
            task: task,
            plan: plan_cells,
            actual: actual_cells,
        }
    }
}
