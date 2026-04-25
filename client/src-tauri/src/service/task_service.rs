use crate::db::database::Database;
use crate::define_service_multiple_id;
use crate::model::task::{Task, TaskRequest};
use crate::model::task_actual_cell::TaskActualCell;
use crate::model::task_plan_cell::TaskPlanCell;
use crate::service::search_utils::{JoinType, SearchBuilder};
use serde::{Deserialize, Serialize};

define_service_multiple_id!(
    TaskService,
    Task,
    TaskRequest,
    list,
    create,
    update,
    delete,
    find_task_by_project,
    find_task,
    find_task_mut,
    add_task,
    delete_task,
    next_task_id,
    project_id,
    id
);

impl TaskService {
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
