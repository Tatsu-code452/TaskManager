import { TaskRow } from "../../../types/db/task";
import { TaskActualRow } from "../../../types/db/taskActual";
import { TaskPlanRow } from "../../../types/db/taskPlan";
import { TaskMatrixValue, TaskModel } from "../types/model";

export const toTaskModelFromRows = (
    task: TaskRow,
    planCells: TaskPlanRow[],
    actualCells: TaskActualRow[],
): TaskModel => {
    const planMatrix: TaskMatrixValue[] = planCells.map((c) => ({
        date: c.date,
        value: c.hours,
    }));

    const actualMatrix: TaskMatrixValue[] = actualCells.map((c) => ({
        date: c.date,
        value: c.hours,
    }));

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
            cells: planMatrix,
        },

        actual: {
            start: task.actual_start,
            end: task.actual_end,
            totalHours: task.actual_hours,
            progress: task.progress_rate,
            cells: actualMatrix,
        },

    };
};