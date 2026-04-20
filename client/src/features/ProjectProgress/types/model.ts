import { TaskStatus } from "../../../types/db/task";
import { TaskActualRow } from "../../../types/db/taskActual";
import { TaskPlanRow } from "../../../types/db/taskPlan";

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

    plan: TaskTimeline;
    actual: TaskTimeline;
};

export interface TaskTimeline {
    start?: string;
    end?: string;
    totalHours: number;
    progress: number;
    cells: Record<string, number>;
}

export const toMap = (rows: TaskPlanRow[] | TaskActualRow[]) => {
    const map: Record<string, number> = {};
    rows.forEach(r => map[r.date] = r.hours);
    return map;
};
