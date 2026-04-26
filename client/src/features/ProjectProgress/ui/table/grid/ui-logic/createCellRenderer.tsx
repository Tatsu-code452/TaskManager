import { CellPos } from "../../../../../../components/grid-table/types";
import { EditDispatch, RowSelectors } from "../../../../types/contract";
import { TaskModel } from "../../../../types/model";
import { GanttDragController, START_GANTT } from "../../../../types/uiApi";
import { useGanttRenderer } from "./createGanttRenderer";
import { createProgressRenderer } from "./createProgressRenderer";

interface Props {
    tasks: TaskModel[];
    baseDate: string;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    dates: string[];
    onPointerDown: GanttDragController["onPointerDown"];
    updateCurrentDate: (date: string) => void; // ★ dragData を更新する関数
}

const getCellType = (pos: CellPos) => {
    if (pos.row % 2 === 1) return "empty";
    if (pos.col === 0) return "phase";
    if (pos.col === 1) return "task";
    if (pos.col === 2) return "progress";
    return "gantt";
};

export const useCellRenderer = ({
    tasks,
    baseDate,
    editDispatch,
    selectors,
    dates,
    onPointerDown,
    updateCurrentDate,
}: Props) => {
    const { rendererProgress } = createProgressRenderer();

    const { rendererGantt, monthEntries, onCellKeyDown } = useGanttRenderer({
        tasks,
        baseDate,
        editDispatch,
        selectors,
        dates,
        onPointerDown,
        updateCurrentDate,
    });

    const cellTypeMap = {
        empty: () => "",
        phase: (task: TaskModel) => task.phase,
        task: (task: TaskModel) => task.name,
        progress: (task: TaskModel) => rendererProgress(task),
        gantt: (task: TaskModel, colIndex: number) =>
            rendererGantt(task, monthEntries[colIndex]),
    };

    const cellRenderer = (pos: CellPos) => {
        const rowIndex = Math.floor(pos.row / 2);
        const colIndex = pos.col - START_GANTT;
        const task = tasks[rowIndex];
        const type = getCellType(pos);

        return cellTypeMap[type](task, colIndex);
    };

    return {
        cellRenderer,
        monthEntries,
        onCellKeyDown,
    };
};
