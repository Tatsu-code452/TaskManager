import { Button } from "../../../../../components/Button";
import { taskToViewData } from "../../../domain/mapping/taskToViewData";
import { TaskDetailPanelEvent, TaskWithUIState } from "../../../types/types";
import styles from "./detail.module.css";
import { viewFields } from "./detailFields";
import TaskDetailItem from "./TaskDetailItem";

interface TaskDetailViewProps {
    task: TaskWithUIState | null;
    onEvent: (event: TaskDetailPanelEvent) => void;
}

export const TaskDetailView = ({ task, onEvent }: TaskDetailViewProps) => {
    const vm = taskToViewData(task);

    return (
        <div className={styles.detailPanel}>
            <div className={styles.detailHeader}>
                <h2>{vm.name}</h2>
                <Button
                    variant="secondary"
                    onClick={() => onEvent({ type: "enterEdit" })}
                >
                    ✎
                </Button>
            </div>

            {viewFields.map((f) => (
                <TaskDetailItem
                    key={f.viewId}
                    mode="view"
                    label={f.label}
                    value={vm[f.viewId]}
                />
            ))}
        </div>
    );
};
