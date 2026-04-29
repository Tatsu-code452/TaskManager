import { useCallback, useMemo } from "react";
import { isCellDelayed } from "../../../domain/service/delay";
import styles from "../styles.module.css";
import { TaskModel } from "../types/type";

export const useResolveCellParams = (baseDate: string) => {
    type R = { task: TaskModel; date: string; isPlan: boolean };

    const timeline = useCallback(
        ({ isPlan, task }: R) => (isPlan ? task.plan : task.actual),
        [],
    );

    const value = useCallback(
        ({ task, date, isPlan }: R) =>
            timeline({ task, date, isPlan }).cells[date] ?? null,
        [timeline],
    );

    const delay = useCallback(
        ({ task, date }: R) => isCellDelayed(task, date),
        [],
    );

    const resolver = useMemo(
        () => ({
            initialValue: (r: R) => value(r),
            startDate: (r: R) => timeline(r).start,
            endDate: (r: R) => timeline(r).end,
            className: (r: R) =>
                [
                    styles.bar_base,
                    value(r)
                        ? r.isPlan
                            ? styles.plan_bar
                            : styles.actual_bar
                        : "",
                    r.date === baseDate ? styles.today : "",
                    delay(r) ? styles.delay_bar : "",
                ]
                    .filter(Boolean)
                    .join(" "),
        }),
        [baseDate, value, delay, timeline],
    );

    return resolver;
};
