import React from "react";
import { GanttParams } from "./contract";

export type DragRef = {
    pos?: {
        x: number,
        y: number
    }
};

export type DragAndDrop<D extends DragRef> = {
    dragRef: React.MutableRefObject<D>;
    onPointerDown: (dragData: D, e: React.PointerEvent) => void;
    bind: (
        selector: string,
        preview: (dragData: D, e: PointerEvent) => void,
        handleDrop: (cell: HTMLElement, dragData: D) => Promise<void>
    ) => void;
    onEnd: () => void;
};

export type PointerDragState<T> = {
    dragging: boolean;
    data: T | null;
};

export type PointerDrag<T> = {
    onPointerDown: (data: T, e: React.PointerEvent<Element>) => void;
    onPointerMove: (handler: (data: T, e: React.PointerEvent) => void, e: React.PointerEvent) => void;
    onPointerUp: (handler: (data: T, e: React.PointerEvent) => void, e: React.PointerEvent) => void;
}

export type GanttDrag = GanttParams & {
    mode: "move" | "resize";
    edge?: "start" | "end";
} & DragRef;