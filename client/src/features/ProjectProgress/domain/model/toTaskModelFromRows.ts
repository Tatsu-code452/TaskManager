import { TaskRow } from "../../../../types/db/task";
import { TaskActualRow } from "../../../../types/db/taskActual";
import { TaskPlanRow } from "../../../../types/db/taskPlan";
import { TaskModel } from "../../components/cell";

const toMap = (rows: TaskPlanRow[] | TaskActualRow[]) => {
    const map: Record<string, number> = {};
    rows.forEach(r => map[r.date] = r.hours);
    return map;
};

export const toTaskModelFromRows = (
    task: TaskRow,
    planCells: TaskPlanRow[],
    actualCells: TaskActualRow[],
): TaskModel => {
    return {
        id: task.id,
        phase: task.phase_id,
        name: task.name,
        status: task.status,
        isCritical: false,

        plan: {
            start: task.planned_start,
            end: task.planned_end,
            totalHours: task.planned_hours,
            progress: task.progress_rate,
            cells: toMap(planCells),
        },

        actual: {
            start: task.actual_start,
            end: task.actual_end,
            totalHours: task.actual_hours,
            progress: task.progress_rate,
            cells: toMap(actualCells),
        },

    };
};