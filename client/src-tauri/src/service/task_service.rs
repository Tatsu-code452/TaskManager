use crate::db::database::Database;
use crate::define_service_multiple_id;
use crate::model::task::{Task, TaskRequest};

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
