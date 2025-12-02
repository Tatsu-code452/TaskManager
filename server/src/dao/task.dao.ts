import GenericDao from "./common.dao";
import { Task } from "../types/task.interface";

type TaskRow = Task & Record<string, unknown>;
const TABLE_NAME = "tasks";
const COLUMN_NAMES: (keyof Task)[] = [
    "id",
    "name",
    "project_id",
    "phase_id",
    "category_id",
    "user_id",
    "planned_start_date",
    "planned_end_date",
    "planned_effort",
    "actual_start_date",
    "actual_end_date",
    "actual_effort",
    "status_id",
    "progress_rate",
    "priority",
    "pre_task_id",
    "next_task_id",
    "created_at",
    "updated_at",
];

export default new GenericDao<TaskRow>(TABLE_NAME, COLUMN_NAMES);
