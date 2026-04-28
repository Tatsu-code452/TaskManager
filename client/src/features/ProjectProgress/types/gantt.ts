export type GanttParams = {
    taskId: string;
    date: string;
    isPlan: boolean;
};

export type GanttDragState = {
    currentDate?: string;
};

export type DragRef = {
    pos?: {
        x: number;
        y: number;
    };
};

export type GanttDrag = GanttParams & GanttDragState & {
    mode: "move" | "resize";
    edge?: "start" | "end";
} & DragRef;

export type Edge = "start" | "end";

export type HandleConfig = {
    edge: Edge;
    dataEdge: string;
    className: string;
};
