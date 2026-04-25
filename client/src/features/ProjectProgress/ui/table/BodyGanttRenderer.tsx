import { useMemo } from "react";
import { useMatrixCellController } from "../../hooks/controller/useMatrixCellController";
import { EditDispatch, GanttParams, RowSelectors } from "../../types/contract";
import { TaskModel } from "../../types/model";
import { GanttDragController } from "../../types/uiApi";
import { createMatrixCellRenderers } from "./cell/MatrixCellRenderers";
import styles from "./grid.module.css";

export const BodyGanttRenderer = ({
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
    // 月ごとにグループ化
    const monthEntries = useMemo(() => {
        const grouped = dates.reduce<Record<string, string[]>>((acc, d) => {
            const [y, m, day] = d.split("-");
            const key = `${y}-${m}`;
            if (!acc[key]) acc[key] = [];
            acc[key].push(day);
            return acc;
        }, {});
        return Object.entries(grouped);
    }, [dates]);

    const { onCellKeyDown, registerCellRef, onStartEdit, isEditing, onCommit } =
        useMatrixCellController(
            editDispatch,
            selectors.editTarget,
            tasks.map((t) => t.id),
            dates,
        );

    const renderMatrixCell = (
        task: TaskModel,
        targetDate: string,
        isPlan: boolean,
    ) => {
        const params: GanttParams = {
            taskId: task.id,
            date: targetDate,
            isPlan: isPlan,
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
        });

        return (
            <div
                key={`${task.id}-${targetDate}-${isPlan}`}
                className={
                    isPlan
                        ? `${styles.body_gantt_row1} ${styles.row1}`
                        : `${styles.body_gantt_row2} ${styles.row2}`
                }
            >
                {matrixCellRenderer({ params })}
            </div>
        );
    };

    const PLAN_ROWS = [{ isPlan: true }, { isPlan: false }];
    const rendererGantt = (task: TaskModel, [ym, days]: [string, string[]]) => {
        return (
            <div className={styles.body_gantt}>
                {days.map((date) => {
                    const targetDate = `${ym}-${date}`;
                    return (
                        <div key={`${task.id}-${targetDate}`}>
                            {PLAN_ROWS.map(({ isPlan }) =>
                                renderMatrixCell(task, targetDate, isPlan),
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };
    return { rendererGantt, monthEntries, onCellKeyDown };
};
