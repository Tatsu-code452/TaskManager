import React, { useCallback, useMemo } from "react";
import {
    CreateUseCellRenderers,
    EditTarget,
    GanttParams,
    TaskModel,
} from "../../../../components/cell";
import { EditDispatch, RowSelectors } from "../../../../types/contract";
import { GanttDragController } from "../../../../types/uiApi";
import styles from "../../grid.module.css";

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

const createGanttCell = ({
    task,
    date,
    isPlan,
    editTarget,
    gnttCellRenderer,
}: {
    task: TaskModel;
    date: string;
    isPlan: boolean;
    editTarget: EditTarget | null;
    gnttCellRenderer: (
        params: GanttParams,
        task: TaskModel,
        editTarget: EditTarget | null,
    ) => JSX.Element;
}) => {
    const params: GanttParams = {
        taskId: task.id,
        date,
        isPlan,
    };

    const className = isPlan
        ? `${styles.body_gantt_row1} ${styles.row1}`
        : `${styles.body_gantt_row2} ${styles.row2}`;

    return (
        <div className={className}>
            {gnttCellRenderer(params, task, editTarget)}
        </div>
    );
};

const createGanttRow = (
    task: TaskModel,
    ym: string,
    days: string[],
    editTarget: EditTarget | null,
    gnttCellRenderer: (
        params: GanttParams,
        task: TaskModel,
        editTarget: EditTarget | null,
    ) => JSX.Element,
) => {
    return (
        <>
            {days.map((day) => {
                const date = `${ym}-${day}`;
                return (
                    <div key={`${task.id}-${date}`}>
                        {createGanttCell({
                            task,
                            date,
                            isPlan: true,
                            editTarget,
                            gnttCellRenderer,
                        })}
                        {createGanttCell({
                            task,
                            date,
                            isPlan: false,
                            editTarget,
                            gnttCellRenderer,
                        })}
                    </div>
                );
            })}
        </>
    );
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
    const { startEdit, endEdit } = editDispatch;
    const createCellRenderers = useCallback(() => {
        return CreateUseCellRenderers({
            baseDate,
            dates,
            startEdit,
            endEdit,
            onPointerDown,
            onUpdateCurrentDate,
            onLoadTasks,
        });
    }, [
        baseDate,
        dates,
        startEdit,
        endEdit,
        onPointerDown,
        onUpdateCurrentDate,
        onLoadTasks,
    ]);

    const rendererGantt = React.useCallback(
        (task: TaskModel, [ym, days]: [string, string[]]) => {
            return createGanttRow(
                task,
                ym,
                days,
                selectors.editTarget,
                createCellRenderers().gnttCellRenderer,
            );
        },
        [selectors.editTarget, createCellRenderers],
    );
    return { rendererGantt, monthEntries };
};
