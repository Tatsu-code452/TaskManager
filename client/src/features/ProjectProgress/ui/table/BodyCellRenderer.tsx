import { CellPos } from "../../../../components/grid-table/types";
import { EditDispatch, RowSelectors } from "../../types/contract";
import { TaskModel } from "../../types/model";
import { GanttDragController } from "../../types/uiApi";
import { BodyGanttRenderer } from "./BodyGanttRenderer";
import { BodyProgressRenderer } from "./BodyProgressRenderer";
import styles from "./grid.module.css";

export const BodyCellRenderer = ({
    tasks,
    baseDate,
    editDispatch,
    selectors,
    dates,
    onPointerDown,
}: {
    tasks: TaskModel[];
    baseDate: string;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    dates: string[];
    onPointerDown: GanttDragController["onPointerDown"];
}) => {
    const START_GANTT = 3;

    const { rendererGantt, monthEntries, onCellKeyDown } = BodyGanttRenderer({
        tasks,
        baseDate,
        editDispatch,
        selectors,
        dates,
        onPointerDown,
    });

    const { rendererProgress } = BodyProgressRenderer();

    const getCellType = (pos: CellPos) => {
        if (pos.row % 2 === 1) return "empty"; // actual row の空白セル
        if (pos.col === 0) return "phase";
        if (pos.col === 1) return "task";
        if (pos.col === 2) return "progress";
        return "gantt"; // timeline
    };

    const cellRendererReducer = (task: TaskModel, colIndex: number) => ({
        empty: () => "",
        phase: () => <div className={styles.body_cell}>{task.phase}</div>,
        task: () => <div className={styles.body_cell}>{task.name}</div>,
        progress: () => rendererProgress(task),
        gantt: () => rendererGantt(task, monthEntries[colIndex]),
    });

    const cellRenderer = (pos: CellPos) => {
        const rowIndex = Math.floor(pos.row / 2);
        const colIndex = pos.col - START_GANTT;
        return cellRendererReducer(tasks[rowIndex], colIndex)[
            getCellType(pos)
        ]();
    };

    return {
        cellRenderer,
        monthEntries,
        onCellKeyDown,
    };
};
