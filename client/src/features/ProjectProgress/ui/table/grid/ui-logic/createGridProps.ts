import { useCallback, useMemo } from "react";
import { useGanttDragController } from "../../../../hooks/controller/useGanttDragController";
import { EditDispatch, RowSelectors } from "../../../../types/contract";
import { TaskModel } from "../../../../types/model";
import styles from "../grid.module.css";
import { useCellRenderer } from "./createCellRenderer";
import { createColumns } from "./createColumns";

interface Props {
    projectId: string;
    tasks: TaskModel[];
    baseDate: string;
    dates: string[];
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    onLoadTasks: () => Promise<void>;
}

export const useCreateGridProps = ({
    projectId,
    tasks,
    baseDate,
    dates,
    editDispatch,
    selectors,
    onLoadTasks,
}: Props) => {
    const {
        onPointerDown,
        onGlobalPointerMove,
        onGlobalPointerUp,
        tooltip,
        onUpdateCurrentDate,
    } = useGanttDragController(projectId, tasks, onLoadTasks);

    const { cellRenderer, monthEntries } = useCellRenderer({
        tasks,
        baseDate,
        editDispatch,
        selectors,
        dates,
        onPointerDown,
        onUpdateCurrentDate,
        onLoadTasks,
    });

    const columns = useMemo(() => createColumns({
        monthEntries,
    }), [monthEntries]);

    const bodyRowStyle = useCallback((row: number) => {
        const task = tasks[Math.floor(row / 2)];
        return task
            ? { className: styles[`status_${task.status}`] }
            : {};
    }, [tasks]);

    return {
        columns,
        cellRenderer,
        bodyRowStyle,
        tooltip,
        onGlobalPointerMove,
        onGlobalPointerUp,
    };
};
