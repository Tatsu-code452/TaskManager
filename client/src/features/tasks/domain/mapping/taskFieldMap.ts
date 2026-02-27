import Task from "../../../../types/task.interface";
import { TaskRowEditForm } from "../../types/types";

export const taskFieldMap = {
    name: "name",
    projectId: "project_id",
    phaseId: "phase_id",
    categoryId: "category_id",
    userId: "user_id",
    plannedStart: "planned_start_date",
    plannedEnd: "planned_end_date",
    actualStart: "actual_start_date",
    actualEnd: "actual_end_date",
    progressRate: "progress_rate",
    priority: "priority",
} as const satisfies Record<keyof TaskRowEditForm, keyof Task>;

export type TaskUIField = keyof typeof taskFieldMap;
export type TaskDBField = (typeof taskFieldMap)[TaskUIField];

// DB → UI の逆引き
export const taskFieldMapReverse: Record<TaskDBField, TaskUIField> =
    Object.fromEntries(
        Object.entries(taskFieldMap).map(([ui, db]) => [db, ui])
    ) as Record<TaskDBField, TaskUIField>;