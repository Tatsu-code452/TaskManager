import React, { useCallback, useMemo } from "react";
import {
    EditDispatch,
    RowSelectors
} from "../../../../types/contract";
import { GanttParams } from "../../../../types/gantt";
import { TaskModel } from "../../../../types/model";
import { GanttDragController } from "../../../../types/uiApi";
import { CreateCellRenderers } from "../../cell/CreateCellRenderers";
import styles from "../grid.module.css";

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

export const useGanttRenderer = ({
    baseDate,
    dates,
    editDispatch,
    selectors,
    onPointerDown,
    onUpdateCurrentDate,
    onLoadTasks,
}: Props) => {
    const monthEntries = useMemo(() => groupDatesByMonth(dates), [dates]);

    const createCellRenderers = useCallback(
        (task: TaskModel, params: GanttParams) => {
            return CreateCellRenderers({
                params,
                task,
                baseDate,
                dates,
                editDispatch,
                editTarget: selectors.editTarget,
                onPointerDown,
                onUpdateCurrentDate,
                onLoadTasks,
            });
        },
        [
            baseDate,
            dates,
            editDispatch,
            selectors.editTarget,
            onPointerDown,
            onUpdateCurrentDate,
            onLoadTasks,
        ],
    );

    const GanttRenderer = React.useCallback(
        (task: TaskModel, date: string, isPlan: boolean) => {
            const params: GanttParams = {
                taskId: task.id,
                date,
                isPlan,
            };

            const { matrixCellRenderer } = createCellRenderers(task, params);

            const className = isPlan
                ? `${styles.body_gantt_row1} ${styles.row1}`
                : `${styles.body_gantt_row2} ${styles.row2}`;

            return (
                <div className={className}>
                    {matrixCellRenderer({ params })}
                </div>
            );
        },
        [createCellRenderers],
    );

    const rendererGantt = React.useCallback(
        (task: TaskModel, [ym, days]: [string, string[]]) => {
            return (
                <>
                    {days.map((date) => {
                        const targetDate = `${ym}-${date}`;
                        return (
                            <div key={`${task.id}-${targetDate}`}>
                                {GanttRenderer(task, targetDate, true)}
                                {GanttRenderer(task, targetDate, false)}
                            </div>
                        );
                    })}
                </>
            );
        },
        [GanttRenderer],
    );
    return { rendererGantt, monthEntries };
};
