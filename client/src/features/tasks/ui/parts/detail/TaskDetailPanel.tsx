import { TaskDetailPanelEvent, TaskWithUIState } from "../../../types/types";
import styles from "./detail.module.css";
import { TaskDetailEdit } from "./TaskDetailEdit";
import { TaskDetailView } from "./TaskDetailView";

interface TaskDetailPanelProps {
    task: TaskWithUIState | null;
    onEvent: (event: TaskDetailPanelEvent) => void;
}
export const TaskDetailPanel = ({ task, onEvent }: TaskDetailPanelProps) => {
    if (!task) {
        return (
            <div className={styles.detailPanelEmpty}>
                タスクを選択してください
            </div>
        );
    }
    return task.__editing ? (
        <TaskDetailEdit task={task} onEvent={onEvent} />
    ) : (
        <TaskDetailView task={task} onEvent={onEvent} />
    );
};
