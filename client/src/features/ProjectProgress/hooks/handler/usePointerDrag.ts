import { useCallback, useRef } from "react";
import { DragRef, PointerDragState } from "../../types/hooks";


export const usePointerDrag = <T extends DragRef>() => {
    const state = useRef<PointerDragState<T>>({
        dragging: false,
        data: null,
    });

    const onPointerDown = useCallback(
        (data: T, e: React.PointerEvent) => {
            (e.target as HTMLElement).setPointerCapture(e.pointerId);

            state.current = {
                dragging: true,
                data: {
                    ...data,
                    pos: {
                        x: e.clientX,
                        y: e.clientY,
                    },
                },
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
