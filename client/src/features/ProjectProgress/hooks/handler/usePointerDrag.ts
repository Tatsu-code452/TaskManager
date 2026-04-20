import { useCallback, useRef } from "react";
import { PointerDragState } from "../../types/hooks";


export const usePointerDrag = <T,>() => {
    const state = useRef<PointerDragState<T>>({
        dragging: false,
        data: null,
        startX: 0,
        startY: 0,
    });

    const onPointerDown = useCallback(
        (data: T, e: React.PointerEvent) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);

            state.current = {
                dragging: true,
                data,
                startX: e.clientX,
                startY: e.clientY,
            };
        },
        [],
    );

    const onPointerMove = useCallback(
        (handler: (data: T, e: React.PointerEvent) => void, e: React.PointerEvent) => {
            if (!state.current.dragging || !state.current.data) return;
            handler?.(state.current.data, e);
        },
        [],
    );

    const onPointerUp = useCallback(
        (handler: (data: T, e: React.PointerEvent) => void, e: React.PointerEvent) => {
            if (!state.current.dragging || !state.current.data) return;

            handler?.(state.current.data, e);

            state.current = {
                dragging: false,
                data: null,
                startX: 0,
                startY: 0,
            };

            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        },
        [],
    );

    return {
        onPointerDown,
        onPointerMove,
        onPointerUp,
    };
};
