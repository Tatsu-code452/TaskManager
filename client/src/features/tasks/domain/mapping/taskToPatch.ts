import Task from "../../../../types/task.interface";
import { TaskRowEditForm } from "../../types/types";
import { isBlank } from "./converter/isBlank";
import { toNumber } from "./converter/number";

export const taskToPatch = (
    original: Task,
    draft: TaskRowEditForm
): Partial<Task> => {

    const patch: Partial<Task> = {};

    const orNull = (v: string) => (isBlank(v) ? null : v);

    if (draft.name !== original.name) patch.name = draft.name;

    const numericFields = [
        ["projectId", "project_id"],
        ["phaseId", "phase_id"],
        ["categoryId", "category_id"],
        ["userId", "user_id"],
    ] as const;

    for (const [uiKey, dbKey] of numericFields) {
        const newValue = toNumber(draft[uiKey]);
        if (newValue !== original[dbKey]) {
            patch[dbKey] = newValue;
        }
    }

    // 日付系
    const dateFields = [
        ["plannedStart", "planned_start_date"],
        ["plannedEnd", "planned_end_date"],
        ["actualStart", "actual_start_date"],
        ["actualEnd", "actual_end_date"],
    ] as const;

    for (const [uiKey, dbKey] of dateFields) {
        const newValue = orNull(draft[uiKey]);
        if (newValue !== original[dbKey]) {
            patch[dbKey] = newValue;
        }
    }

    if (draft.progressRate !== original.progress_rate)
        patch.progress_rate = draft.progressRate;

    if (draft.priority !== original.priority)
        patch.priority = draft.priority;

    return patch;
};