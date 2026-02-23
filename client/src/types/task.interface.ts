export default interface Task {
    id: number;
    name: string;
    project_id: number;
    phase_id: number;
    category_id: number;
    user_id: number;
    planned_start_date: string | null;
    planned_end_date: string | null;
    planned_effort: number;
    actual_start_date: string | null;
    actual_end_date: string | null;
    actual_effort: number;
    status_id: number;
    progress_rate: number;
    priority: number;
    pre_task_id: number | null;
    next_task_id: number | null;
    created_at: string | null;
    updated_at: string | null;
}
