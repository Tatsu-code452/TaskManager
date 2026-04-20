import React, { useEffect, useRef } from "react";
import { DragRef } from "../../types/hooks";

export const useDragAndDrop = <D extends DragRef>() => {
    const dragRef = useRef<null | D>(null);
    const moveHandlerRef = useRef<(e: PointerEvent) => void>(() => { });
    const upHandlerRef = useRef<(e: PointerEvent) => void>(() => { });

    const onPointerDown = (dragData: D, e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);

        dragRef.current = {
            ...dragData,
            pos: {
                x: e.clientX,
                y: e.clientY,
            }
        };
    };

    const onEnd = () => {
        dragRef.current = null;
    };

    const bind = (
        selector: string,
        preview: (dragData: D, e: PointerEvent) => void,
        handleDrop: (cell: HTMLElement, dragData: D) => Promise<void>,
    ) => {
        moveHandlerRef.current = (e: PointerEvent) => {
            if (!dragRef.current) return;
            preview(dragRef.current, e);
        };

        upHandlerRef.current = async (e: PointerEvent) => {
            if (!dragRef.current) return;

            const el = document.elementFromPoint(e.clientX, e.clientY);
            const cell = el?.closest(selector) as HTMLElement | null;

            if (cell) {
                await handleDrop(cell, dragRef.current);
            }

            onEnd();
        };
    };

    useEffect(() => {
        const moveListener = (e: PointerEvent) => moveHandlerRef.current(e);
        const upListener = (e: PointerEvent) => upHandlerRef.current(e);

        window.addEventListener("pointermove", moveListener);
        window.addEventListener("pointerup", upListener);

        return () => {
            window.removeEventListener("pointermove", moveListener);
            window.removeEventListener("pointerup", upListener);
        };
    }, []);

    return {
        dragRef,
        onPointerDown,
        bind,
        onEnd
    }
}