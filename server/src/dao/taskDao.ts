import { createDao } from "./commonDao";

const TABLE_NAME = "tasks";
const COLUMN_NAMES = [
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

export default createDao(TABLE_NAME, COLUMN_NAMES);
