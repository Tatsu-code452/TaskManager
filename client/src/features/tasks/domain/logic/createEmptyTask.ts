import Task from "../../../../types/task.interface";

export const createEmptyTask = () => ({
    id: 0,
    name: "",
    project_id: 1,
    phase_id: 1,
    category_id: 1,
    user_id: 1,
    planned_start_date: "",
    planned_end_date: "",
    planned_effort: 0,
    actual_start_date: "",
    actual_end_date: "",
    actual_effort: 0,
    status_id: 1,
    progress_rate: 0,
    priority: 1,
    created_at: "",
    updated_at: "",
}) as Task;
