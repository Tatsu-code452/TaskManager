import { TaskModel } from "../../types/model";
import styles from "./grid.module.css";

export const BodyProgressRenderer = () => {
    const rendererProgress = (task: TaskModel) => (
        <div className={styles.grid_progress}>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row1} ${styles.body_row1}`}
            >
                {task.plan.start}
            </div>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row2} ${styles.body_row2}`}
            >
                {task.actual.start}
            </div>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row1} ${styles.body_row1}`}
            >
                {task.plan.end}
            </div>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row2} ${styles.body_row2}`}
            >
                {task.actual.end}
            </div>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row1} ${styles.body_row1}`}
            >
                {task.plan.totalHours}
            </div>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row2} ${styles.body_row2}`}
            >
                {task.actual.totalHours}
            </div>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row1} ${styles.body_row1}`}
            >
                {task.plan.progress}%
            </div>
            <div
                className={`${styles.body_cell} ${styles.body_progress_row2} ${styles.body_row2}`}
            >
                {task.actual.progress}%
            </div>
        </div>
    );
    return { rendererProgress };
};
