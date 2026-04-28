import { useMemo } from "react";
import { TaskModel, TaskTimeline } from "../../../../types/model";
import styles from "../grid.module.css";

export const useProgressRenderer = () => {
    return useMemo(() => {
        const rowClass = {
            plan: `${styles.body_cell} ${styles.body_progress_row1} ${styles.body_row1}`,
            actual: `${styles.body_cell} ${styles.body_progress_row2} ${styles.body_row2}`,
        };

        const rendererProgressRow = (
            timeline: TaskTimeline,
            type: "plan" | "actual",
        ) => {
            const cls = rowClass[type];
            return (
                <>
                    <div className={cls}>{timeline.start}</div>
                    <div className={cls}>{timeline.end}</div>
                    <div className={cls}>{timeline.totalHours}</div>
                    <div className={cls}>{timeline.progress}%</div>
                </>
            );
        };

        const rendererProgress = (task: TaskModel) => (
            <>
                {rendererProgressRow(task.plan, "plan")}
                {rendererProgressRow(task.actual, "actual")}
            </>
        );
        return { rendererProgress };
    }, []);
};
