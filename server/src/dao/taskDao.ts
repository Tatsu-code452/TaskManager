import { createDao } from "./commonDao";



export type Task = {
    id: number;
    name: string;
    project_id: number;
    phase_id: number;
    category_id: number;
    user_id: number;
    planned_start_date: string;
    planned_end_date: string;
    planned_effort: number;
    actual_start_date: string;
    actual_end_date: string;
    actual_effort: number;
    status_id: number;
    progress_rate: number;
    priority: number;
    pre_task_id: number | null;
    next_task_id: number | null;
    created_at: string;
    updated_at: string;
};

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

export default createDao<Task>(TABLE_NAME, COLUMN_NAMES);
