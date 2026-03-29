import { TaskStatus } from "../../../types/db/task";

export interface ProgressPageState {
    displayRange: DisplayRange;
    baseDate: string;
    tasks: TaskModel[];
}

export interface DisplayRange {
    from: string;
    to: string;
}

export type TaskModel = {
    id: string;
    phase: string;
    name: string;
    status: TaskStatus;

    isCritical?: boolean;

    plan: TaskPlan;
    actual: TaskActual;
};

/** 計画情報 */
export interface TaskPlan {
    start?: string;
    end?: string;
    totalHours: number;
    progress: number;
    cells: TaskMatrixValue[];
}

/** 実績情報 */
export interface TaskActual {
    start?: string;
    end?: string;
    totalHours: number;
    progress: number;
    cells: TaskMatrixValue[];
}

export type TaskMatrixValue = {
    date: string;
    value: number;
};