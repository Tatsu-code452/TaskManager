import { useCallback, useMemo } from "react";
import { CellPos } from "../../../../../../components/grid-table/types";
import { TaskModel } from "../../../../components/cell";
import { EditDispatch, RowSelectors } from "../../../../types/contract";
import { GanttDragController, START_GANTT } from "../../../../types/uiApi";
import { useProgressRenderer } from "../createProgressRenderer";
import { useGanttRenderer } from "./createGanttRenderer";

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

const resolveCellType = (pos: CellPos) => {
    if (pos.row % 2 === 1) return "empty";
    if (pos.col === 0) return "phase";
    if (pos.col === 1) return "task";
    if (pos.col === 2) return "progress";
    return "gantt";
};

const resolveTask = (pos: CellPos, tasks: TaskModel[]) => {
    const rowIndex = Math.floor(pos.row / 2);
    return tasks[rowIndex] ?? null;
};

const resolveColIndex = (pos: CellPos) => pos.col - START_GANTT;

export const useCellRenderer = ({
    tasks,
    baseDate,
    editDispatch,
    selectors,
    dates,
    onPointerDown,
    onUpdateCurrentDate,
    onLoadTasks,
}: Props) => {
    const { rendererProgress } = useProgressRenderer();

    const { rendererGantt, monthEntries } = useGanttRenderer({
        baseDate,
        dates,
        editDispatch,
        selectors,
        onPointerDown,
        onUpdateCurrentDate,
        onLoadTasks,
    });

    const cellTypeMap = useMemo(
        () => ({
            empty: () => "",
            phase: (task: TaskModel) => task.phase,
            task: (task: TaskModel) => task.name,
            progress: (task: TaskModel) => rendererProgress(task),
            gantt: (task: TaskModel, colIndex: number) =>
                rendererGantt(task, monthEntries[colIndex]),
        }),
        [rendererProgress, rendererGantt, monthEntries],
    );

    const cellRenderer = useCallback(
        (pos: CellPos) => {
            const type = resolveCellType(pos);
            const task = resolveTask(pos, tasks);
            if (!task) return "";

            const colIndex = resolveColIndex(pos);
            return cellTypeMap[type](task, colIndex);
        },
        [tasks, cellTypeMap],
    );

    return {
        cellRenderer,
        monthEntries,
    };
};
