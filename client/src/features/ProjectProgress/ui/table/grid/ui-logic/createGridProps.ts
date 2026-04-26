import { CellPos } from "../../../../../../components/grid-table/types";
import { useGanttDragController } from "../../../../hooks/controller/useGanttDragController";
import { EditDispatch, GanttParams, PageStateDispatch, RowSelectors } from "../../../../types/contract";
import { TaskModel } from "../../../../types/model";
import { START_GANTT } from "../../../../types/uiApi";
import styles from "../grid.module.css";
import { useCellRenderer } from "./createCellRenderer";
import { createColumns } from "./createColumns";

interface Props {
    dates: string[];
    projectId: string;
    tasks: TaskModel[];
    baseDate: string;
    pageStateDispatch: PageStateDispatch;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
}
export const useCreateGridProps = ({
    dates,
    tasks,
    baseDate,
    projectId,
    pageStateDispatch,
    editDispatch,
    selectors,
}: Props) => {
    const drag = useGanttDragController(projectId, tasks, pageStateDispatch);

    const { cellRenderer, monthEntries, onCellKeyDown } = useCellRenderer({
        tasks,
        baseDate,
        editDispatch,
        selectors,
        dates,
        onPointerDown: drag.onPointerDown,
        updateCurrentDate: drag.updateCurrentDate,
    });

    const columns = createColumns({
        monthEntries,
    });

    const bodyRowStyle = (row: number) => {
        const task = tasks[Math.floor(row / 2)];
        return task
            ? { className: styles[`status_${task.status}`] }
            : {};
    };

    const onKeyDown = (pos: CellPos, e: React.KeyboardEvent) => {
        const rowIndex = Math.floor(pos.row / 2);
        const colIndex = pos.col - START_GANTT;

        if (colIndex < 0) return;

        const params: GanttParams = {
            taskId: tasks[rowIndex].id,
            date: dates[pos.col - START_GANTT],
            isPlan: pos.row % 2 === 1,
        };
        onCellKeyDown(params, e);
    };

    return {
        columns,
        cellRenderer,
        onKeyDown,
        bodyRowStyle,
        tooltip: drag.tooltip,
        onGlobalPointerMove: drag.onGlobalPointerMove,
        onGlobalPointerUp: drag.onGlobalPointerUp,
    };
};
