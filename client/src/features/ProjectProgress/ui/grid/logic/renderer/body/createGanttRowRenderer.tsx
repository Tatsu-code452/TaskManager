import React, { useMemo } from "react";
import { TaskModel, useCellRenderers } from "../../../../../components/cell";
import { EditDispatch, RowSelectors } from "../../../../../types/contract";
import { GanttDragController } from "../../../../../types/uiApi";
import { useGanttCellRenderer } from "./createGanttCellRenderer";

interface Props {
    baseDate: string;
    dates: string[];
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    onPointerDown: GanttDragController["onPointerDown"];
    onUpdateCurrentDate: (date: string) => void;
    onLoadTasks: () => void;
}

// 月ごとにグループ化
const groupDatesByMonth = (dates: string[]) => {
    const grouped = dates.reduce<Record<string, string[]>>((acc, d) => {
        const [y, m, day] = d.split("-");
        const key = `${y}-${m}`;
        (acc[key] ??= []).push(day);
        return acc;
    }, {});
    return Object.entries(grouped);
};

export const useGanttRowRenderer = ({
    baseDate,
    dates,
    editDispatch,
    selectors,
    onPointerDown,
    onUpdateCurrentDate,
    onLoadTasks,
}: Props) => {
    const monthEntries = useMemo(() => groupDatesByMonth(dates), [dates]);
    const { startEdit, endEdit } = editDispatch;

    const { cellRenderer } = useCellRenderers({
        baseDate,
        dates,
        startEdit,
        endEdit,
        onPointerDown,
        onUpdateCurrentDate,
        onLoadTasks,
    });

    const { ganttCellWrapRenderer } = useGanttCellRenderer();

    const ganttRowRenderer = React.useCallback(
        (task: TaskModel, [ym, days]: [string, string[]]) => {
            return ganttCellWrapRenderer(
                task,
                ym,
                days,
                selectors.editTarget,
                cellRenderer,
            );
        },
        [selectors.editTarget, ganttCellWrapRenderer, cellRenderer],
    );
    return { ganttRowRenderer, monthEntries };
};
