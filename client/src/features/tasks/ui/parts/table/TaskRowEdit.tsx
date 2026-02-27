import React from "react";
import { Button } from "../../../../../components/Button";
import Task from "../../../../../types/task.interface";
import { useTaskRowEditController } from "../../../hooks/controller/useTaskRowEditController";
import styles from "./table.module.css";

export interface TaskRowEditProp {
    task: Task;
    onSave: () => void;
    onCancel: () => void;
}

export const TaskRowEdit = ({ task, onSave, onCancel }) => {
    const { vm, update, handleSave, handleCancel } = useTaskRowEditController(
        task,
        onSave,
        onCancel,
    );

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSave();
        }
        if (e.key === "Escape") {
            e.preventDefault();
            handleCancel();
        }
    };

    return (
        <tr className={styles.editRow} onKeyDown={onKeyDown}>
            <td>
                <input
                    value={vm.name}
                    onChange={(e) => update("name", e.target.value)}
                    autoFocus
                />
            </td>

            {/* <td>
                <input
                    value={vm.projectId}
                    onChange={(e) => update("projectId", e.target.value)}
                />
            </td>

            <td>
                <input
                    value={vm.phaseId}
                    onChange={(e) => update("phaseId", e.target.value)}
                />
            </td>

            <td>
                <input
                    value={vm.userId}
                    onChange={(e) => update("userId", e.target.value)}
                />
            </td>

            <td>
                <input
                    type="date"
                    value={vm.plannedStart}
                    onChange={(e) => update("plannedStart", e.target.value)}
                />
                <input
                    type="date"
                    value={vm.plannedEnd}
                    onChange={(e) => update("plannedEnd", e.target.value)}
                />
            </td>

            <td>
                <input
                    type="date"
                    value={vm.actualStart}
                    onChange={(e) => update("actualStart", e.target.value)}
                />
                <input
                    type="date"
                    value={vm.actualEnd}
                    onChange={(e) => update("actualEnd", e.target.value)}
                />
            </td> */}

            <td>
                <input
                    type="number"
                    value={vm.progressRate}
                    onChange={(e) => update("progressRate", e.target.value)}
                />
            </td>

            <td>
                <input
                    type="number"
                    value={vm.priority}
                    onChange={(e) => update("priority", e.target.value)}
                />
            </td>

            <td className={styles.rowActions}>
                <Button variant="primary" onClick={handleSave}>
                    ✔
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                    ✖
                </Button>
            </td>
        </tr>
    );
};

export default React.memo(TaskRowEdit);
