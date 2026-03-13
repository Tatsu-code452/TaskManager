import { TaskRow, TaskStatus } from "../../../types/db/task";
import { TaskActualRow } from "../../../types/db/taskActual";
import { TaskPlanRow } from "../../../types/db/taskPlan";

export type TaskModel = {
    id: string;
    phase: string;
    name: string;
    status: TaskStatus;

    isCritical?: boolean;

    plan: {
        start?: string;
        end?: string;
        totalHours: number;
        progress: number;
        cells: TaskMatrixValue[];
    };

    actual: {
        start?: string;
        end?: string;
        totalHours: number;
        progress: number;
        cells: TaskMatrixValue[];
    };
};

/** 計画情報 */
export interface TaskPlan {
    cells: TaskMatrixValue[];
    start?: string;
    end?: string;
    totalHours: number;
    progress: number;
}

/** 実績情報 */
export interface TaskActual {
    cells: TaskMatrixValue[];
    start?: string;
    end?: string;
    totalHours: number;
    progress: number;
}

export type TaskMatrixValue = {
    date: string;
    value: number;
};

export interface ProgressPageState {
    displayRange: DisplayRange;
    baseDate: string;
    tasks: TaskModel[];
}

export interface DisplayRange {
    from: string;
    to: string;
}

export const toTaskModel = (
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

export type EditTarget =
    | { type: "planCell"; taskIndex: string; date: string; pressedKey?: string }
    | { type: "actualCell"; taskIndex: string; date: string; pressedKey?: string }
    | { type: "actualProgress"; taskIndex: string; pressedKey?: string };