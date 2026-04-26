import { useCallback, useRef } from "react";
import { DragRef, PointerDragState } from "../../types/hooks";


export const usePointerDrag = <T extends DragRef>() => {
    const state = useRef<PointerDragState<T>>({
        dragging: false,
        data: null,
    });
    const frameRequested = useRef(false);
    const lastEvent = useRef<React.PointerEvent | null>(null);

    const onPointerDown = useCallback(
        (data: T, e: React.PointerEvent) => {
            (e.target as HTMLElement).parentElement.parentElement.setPointerCapture(e.pointerId);

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
            // 最新のイベントだけ保持
            lastEvent.current = e;

            // すでに rAF が予約されていれば何もしない
            if (frameRequested.current) return;
            frameRequested.current = true;

            requestAnimationFrame(() => {
                frameRequested.current = false;

                if (!state.current.dragging || !state.current.data) return;
                if (!lastEvent.current) return;

                handler(state.current.data, lastEvent.current);
            });
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

            (e.target as HTMLElement).parentElement.parentElement.releasePointerCapture(e.pointerId);
        },
        [],
    );

    return {
        state,
        onPointerDown,
        onPointerMove,
        onPointerUp,
    };
};
