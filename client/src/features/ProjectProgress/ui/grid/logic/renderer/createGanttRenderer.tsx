import { useCallback } from "react";
import { CellPos } from "../../../../../../components/grid-table/types";
import { TaskModel } from "../../../../components/cell";
import { EditDispatch, RowSelectors } from "../../../../types/contract";
import { GanttDragController } from "../../../../types/uiApi";
import { useGanttRowRenderer } from "./body/createGanttRowRenderer";
import { useResolveUtils } from "./resolveUtils";

interface Props {
    tasks: TaskModel[];
    baseDate: string;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    dates: string[];
    onPointerDown: GanttDragController["onPointerDown"];
    onUpdateCurrentDate: GanttDragController["updateCurrentDate"];
    onLoadTasks: () => void;
}

export const useGanttRenderer = ({
    tasks,
    baseDate,
    editDispatch,
    selectors,
    dates,
    onPointerDown,
    onUpdateCurrentDate,
    onLoadTasks,
}: Props) => {
    const { ganttRowRenderer, monthEntries } = useGanttRowRenderer({
        baseDate,
        dates,
        editDispatch,
        selectors,
        onPointerDown,
        onUpdateCurrentDate,
        onLoadTasks,
    });
    const { resolveTask, resolveCellTypeToGantt, cellTypeMapToGantt } =
        useResolveUtils({
            ganttRowRenderer,
            monthEntries,
        });

    const cellRenderer = useCallback(
        (pos: CellPos) => {
            const type = resolveCellTypeToGantt(pos);
            const task = resolveTask(pos, tasks);
            if (!task) return "";

            const colIndex = pos.col;
            return cellTypeMapToGantt[type](task, colIndex);
        },
        [tasks, cellTypeMapToGantt, resolveTask, resolveCellTypeToGantt],
    );

    return {
        cellRenderer,
        monthEntries,
    };
};
