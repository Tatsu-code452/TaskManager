import { useRef } from "react";
import { GanttParams } from "../../types/type";

export const useCellRef = () => {
    const cellRefMap = useRef<Record<string, HTMLElement>>({});
    const cellRefMapKey = (params: GanttParams) =>
        `${params.taskId}-${params.date}-${params.isPlan}`;

    const registerCellRef = (
        params: GanttParams,
        el: HTMLElement | null,
    ) => {
        if (el) {
            cellRefMap.current[cellRefMapKey(params)] = el;
        }
    };

    const focusCell = (params: GanttParams) => {
        const el = cellRefMap.current[cellRefMapKey(params)];
        el?.focus();
    };

    return {
        registerCellRef,
        focusCell,
    }
}