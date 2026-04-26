import { useMemo } from "react";
import { useMatrixCellController } from "../../../../hooks/controller/useMatrixCellController";
import {
    EditDispatch,
    GanttParams,
    RowSelectors,
} from "../../../../types/contract";
import { TaskModel } from "../../../../types/model";
import { GanttDragController } from "../../../../types/uiApi";
import { createMatrixCellRenderers } from "../../cell/MatrixCellRenderers";
import styles from "../grid.module.css";

interface Props {
    tasks: TaskModel[];
    baseDate: string;
    editDispatch: EditDispatch;
    selectors: RowSelectors;
    dates: string[];
    onPointerDown: GanttDragController["onPointerDown"];
    updateCurrentDate: (date: string) => void; // ★ dragData を更新する関数
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

export const useGanttRenderer = ({
    tasks,
    baseDate,
    editDispatch,
    selectors,
    dates,
    onPointerDown,
    updateCurrentDate,
}: Props) => {
    const monthEntries = useMemo(() => groupDatesByMonth(dates), [dates]);

    const { onCellKeyDown, registerCellRef, onStartEdit, isEditing, onCommit } =
        useMatrixCellController(
            editDispatch,
            selectors.editTarget,
            tasks.map((t) => t.id),
            dates,
        );

    const renderMatrixCell = (
        task: TaskModel,
        date: string,
        isPlan: boolean,
    ) => {
        const params: GanttParams = {
            taskId: task.id,
            date,
            isPlan,
        };

        const { matrixCellRenderer } = createMatrixCellRenderers({
            params,
            task,
            baseDate,
            onPointerDown,
            registerCellRef,
            onStartEdit,
            isEditing,
            onCommit,
            onCellKeyDown,
            updateCurrentDate,
        });

        const className = isPlan
            ? `${styles.body_gantt_row1} ${styles.row1}`
            : `${styles.body_gantt_row2} ${styles.row2}`;

        return (
            <div className={className}>{matrixCellRenderer({ params })}</div>
        );
    };

    const rendererGantt = (task: TaskModel, [ym, days]: [string, string[]]) => {
        return (
            <>
                {days.map((date) => {
                    const targetDate = `${ym}-${date}`;
                    return (
                        <div key={`${task.id}-${targetDate}`}>
                            {renderMatrixCell(task, targetDate, true)}
                            {renderMatrixCell(task, targetDate, false)}
                        </div>
                    );
                })}
            </>
        );
    };
    return { rendererGantt, monthEntries, onCellKeyDown };
};
