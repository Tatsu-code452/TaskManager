import { useCallback, useMemo } from "react";
import { TaskModel } from "../../../components/cell";
import { useGanttDragController } from "../../../hooks/controller/useGanttDragController";
import { EditDispatch, RowSelectors } from "../../../types/contract";
import styles from "../grid.module.css";
import { createColumns } from "./renderer/createColumns";
import { useGanttRenderer } from "./renderer/createGanttRenderer";
import { useWbsRenderer } from "./renderer/createWbsRenderer";

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

    const { cellRenderer: ganttRenderer, monthEntries } = useGanttRenderer({
        tasks,
        baseDate,
        editDispatch,
        selectors,
        dates,
        onPointerDown,
        onUpdateCurrentDate,
        onLoadTasks,
    });

    const { cellRenderer: wbsRenderer } = useWbsRenderer({ tasks });

    const { ganttColumnsDef, wbsColumnsDef } = useMemo(() => createColumns({
        monthEntries,
    }), [monthEntries]);

    const bodyRowStyle = useCallback((row: number) => {
        const task = tasks[Math.floor(row / 2)];
        return task
            ? { className: styles[`status_${task.status}`] }
            : {};
    }, [tasks]);

    return {
        wbsColumnsDef,
        ganttColumnsDef,
        wbsRenderer,
        ganttRenderer,
        bodyRowStyle,
        tooltip,
        onGlobalPointerMove,
        onGlobalPointerUp,
    };
};
