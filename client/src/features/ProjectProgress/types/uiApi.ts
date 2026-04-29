import React from "react";
import { GanttDrag } from "../components/cell";

export const START_GANTT = 3;

export type GanttDragController = {
    onPointerDown: (params: GanttDrag, e: React.PointerEvent) => void;
    onGlobalPointerMove: (e: React.PointerEvent) => void;
    onGlobalPointerUp: (e: React.PointerEvent) => void;
    updateCurrentDate: (date: string) => void
}