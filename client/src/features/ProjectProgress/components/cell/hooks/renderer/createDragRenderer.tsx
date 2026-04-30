import React, { useCallback } from "react";
import CellDragHandle from "../../ui/CellDragHandle";

export const useDragRenderer = () =>
    useCallback(
        (
            date: string,
            startDate: string,
            endDate: string,
            handlePointerDown: (
                edge: "start" | "end" | null,
                e: React.PointerEvent,
            ) => void,
            handleUpdateCurrentData: () => void,
        ) => (
            <CellDragHandle
                isStart={date === startDate}
                isEnd={date === endDate}
                onPointerDown={(edge, e) => handlePointerDown(edge, e)}
                onPointerEnter={handleUpdateCurrentData}
            />
        ),
        [],
    );
