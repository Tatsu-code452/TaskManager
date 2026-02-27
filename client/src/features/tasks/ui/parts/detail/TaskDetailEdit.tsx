import { Button } from "../../../../../components/Button";
import { useTaskRowEditController } from "../../../hooks/controller/useTaskRowEditController";
import { TaskDetailPanelEvent, TaskWithUIState } from "../../../types/types";
import styles from "./detail.module.css";
import { editFields } from "./detailFields";
import TaskDetailItem from "./TaskDetailItem";

interface TaskDetailEditProps {
    task: TaskWithUIState | null;
    onEvent: (event: TaskDetailPanelEvent) => void;
}

export const TaskDetailEdit = ({ task, onEvent }: TaskDetailEditProps) => {
    const { vm, update, handleSave, handleCancel } = useTaskRowEditController(
        task,
        (patch) => onEvent({ type: "save", patch }),
        () => onEvent({ type: "cancelEdit" }),
    );

    const isEditing = task.__editing;
    // アンマウント
    if (!isEditing) return null;

    return (
        <div className={styles.detailPanel}>
            <h2>編集</h2>

            {editFields.map((f) => (
                <TaskDetailItem
                    key={f.editId}
                    mode="edit"
                    editId={f.editId}
                    label={f.label}
                    value={vm[f.editId]}
                    inputType={f.inputType}
                    onChange={update}
                />
            ))}

            <div className={styles.detailActions}>
                <Button variant="primary" onClick={handleSave}>
                    ✔
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    ✖
                </Button>
            </div>
        </div>
    );
};
