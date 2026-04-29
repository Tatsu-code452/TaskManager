import { TaskStatus } from "../../../../../types/db/task";

export type GanttParams = {
    taskId: string;
    date: string;
    isPlan: boolean;
};

export type Edge = "start" | "end";

export type HandleConfig = {
    edge: Edge;
    dataEdge: string;
    className: string;
};

export type GanttDrag = GanttParams & GanttDragState & {
    mode: "move" | "resize";
    edge?: "start" | "end";
} & DragRef;

export type GanttDragState = {
    currentDate?: string;
};

export type DragRef = {
    pos?: {
        x: number;
        y: number;
    };
};

export type PlanCellTarget = { type: "planCell"; taskId: string; date: string; };
export type ActualCellTarget = { type: "actualCell"; taskId: string; date: string; };

export type EditTarget =
    | PlanCellTarget
    | ActualCellTarget

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
    start: string;
    end: string;
    totalHours: number;
    progress: number;
    cells: Record<string, number>;
}

export type PointerDragState<T> = {
    dragging: boolean;
    data: T | null;
};

