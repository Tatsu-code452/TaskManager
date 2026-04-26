import React from "react";
import { GanttParams } from "./contract";
import { GanttDrag } from "./hooks";

export const START_GANTT = 3;

export type TooltipState = {
    from: string;
    to: string;
    mode: "move" | "resize";
    edge?: "start" | "end" | undefined;
    x: number;
    y: number;
    visible: boolean;
};

export type TooltipApi = {
    state: TooltipState;
    preview: (drag: GanttDrag, e: React.PointerEvent) => void;
    hide: () => void;
}

export type MatrixCellController = {
    onStartEdit: (params: GanttParams) => void;
    onCommit: (params: GanttParams, value: number | null) => Promise<void>;
    onCancelEdit: () => void;
    onCellKeyDown: (params: GanttParams, e: React.KeyboardEvent) => void;
    registerCellRef: (params: GanttParams, el: HTMLElement | null) => void;
    isEditing: (params: GanttParams) => boolean;
}

export type GanttDragController = {
    onPointerDown: (params: GanttDrag, e: React.PointerEvent) => void;
    onGlobalPointerMove: (e: React.PointerEvent) => void;
    onGlobalPointerUp: (e: React.PointerEvent) => void;
    tooltip: {
        state: TooltipState;
        preview: (drag: GanttDrag, e: React.PointerEvent) => void;
        hide: () => void;
    };
}