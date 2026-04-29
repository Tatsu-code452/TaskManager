import React from "react";
import styles from "../styles.module.css";
import { Edge, HandleConfig } from "../types/type";

interface CellDragHandleProps {
    isStart: boolean;
    isEnd: boolean;
    onPointerDown: (edge: Edge, e: React.PointerEvent) => void;
    onPointerEnter: () => void;
}

const HANDLE_CONFIGS: Record<Edge, HandleConfig> = {
    start: {
        edge: "start",
        dataEdge: "start-edge",
        className: styles.handle_left,
    },
    end: {
        edge: "end",
        dataEdge: "end-edge",
        className: styles.handle_right,
    },
};

export const CellDragHandle = ({
    isStart,
    isEnd,
    onPointerDown,
    onPointerEnter,
}: CellDragHandleProps) => {
    const handles = [
        isStart ? HANDLE_CONFIGS.start : null,
        isEnd ? HANDLE_CONFIGS.end : null,
    ].filter((x): x is HandleConfig => x !== null);

    return (
        <>
            {handles.map((cfg) => (
                <div
                    key={cfg.edge}
                    data-edge={cfg.dataEdge}
                    className={cfg.className}
                    onPointerEnter={onPointerEnter}
                    onPointerDown={(e) => onPointerDown(cfg.edge, e)}
                />
            ))}
        </>
    );
};

export default React.memo(CellDragHandle);
