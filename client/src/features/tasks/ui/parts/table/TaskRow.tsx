import React from "react";
import { Button } from "../../../../../components/Button";
import Task from "../../../../../types/task.interface";
import { useTaskRowController } from "../../../hooks/controller/useTaskRowController";
import styles from "./table.module.css";

export interface TaskRowProp {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
    onChangeSelectedTask: () => void;
}

export const TaskRow = ({
    task,
    onEdit,
    onDelete,
    onChangeSelectedTask,
}: TaskRowProp) => {
    const { vm, handleEdit, handleDelete } = useTaskRowController(
        task,
        onEdit,
        onDelete,
    );
    const rowClass = [
        styles.table__row,
        styles[`table__row--priority-${vm.priority}`],
    ].join(" ");

    return (
        <tr className={rowClass} onClick={onChangeSelectedTask}>
            <td>{vm.name}</td>
            <td>{vm.projectId}</td>
            <td>{vm.phaseId}</td>
            <td>{vm.userId}</td>
            <td>{vm.planned}</td>
            <td>{vm.progressRate}%</td>
            <td>{vm.priority}</td>
            <td className={styles.rowActions}>
                <Button
                    variant="secondary"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                >
                    ✎
                </Button>
                <Button
                    variant="danger"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    ✖
                </Button>
            </td>
        </tr>
    );
};

export default React.memo(TaskRow);
