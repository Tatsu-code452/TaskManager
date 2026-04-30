import { useRef } from "react";
import { CellParams } from "../../types/type";

export const useCellRef = () => {
    const cellRefMap = useRef<Record<string, HTMLElement>>({});
    const cellRefMapKey = (params: CellParams) =>
        `${params.taskId}-${params.date}-${params.isPlan}`;

    const registerCellRef = (
        params: CellParams,
        el: HTMLElement | null,
    ) => {
        if (el) {
            cellRefMap.current[cellRefMapKey(params)] = el;
        }
    };

    const focusCell = (params: CellParams) => {
        const el = cellRefMap.current[cellRefMapKey(params)];
        el?.focus();
    };

    return {
        registerCellRef,
        focusCell,
    }
}