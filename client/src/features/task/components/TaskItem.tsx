import React, { useState } from "react";
import Task from "../../../types/task.interface";
import TaskEditModal from "./samples/TaskEditModal";

interface TaskItemProps {
    task: Task;
    userMap?: { [key: number]: string };
    statusMap?: { [key: number]: string };
    categoryMap?: { [key: number]: string };
    onUpdate?: (task: Task) => void;
    onDelete?: (taskId: number) => void;
}

const formatDate = (d?: string) => {
    if (!d) return "----/--/--";
    try {
        const dt = new Date(d);
        if (isNaN(dt.getTime())) return d;
        return dt.toLocaleDateString();
    } catch {
        return d;
    }
};

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    userMap,
    statusMap,
    categoryMap,
    onUpdate,
    onDelete,
}) => {
    const [editing, setEditing] = useState(false);

    const handleEditSave = (updated: Task) => {
        const ok = window.confirm("この内容で保存します。よろしいですか？");
        if (!ok) return;
        onUpdate?.(updated);
        setEditing(false);
    };

    const handleDelete = () => {
        const ok = window.confirm("このタスクを削除します。よろしいですか？");
        if (!ok) return;
        onDelete?.(task.id);
    };
    return (
        <>
            <tr>
                <td>{task.name}</td>
                <td>
                    {userMap && task.user_id ? userMap[task.user_id] : "未登録"}
                </td>
                <td>
                    {statusMap && task.status_id
                        ? statusMap[task.status_id]
                        : "未登録"}
                </td>
                <td>{formatDate(task.planned_start_date)}</td>
                <td>{formatDate(task.planned_end_date)}</td>
                <td>{task.planned_effort}h</td>
                <td>{formatDate(task.actual_start_date)}</td>
                <td>{formatDate(task.actual_end_date)}</td>
                <td>{task.actual_effort}h</td>
                <td>{task.progress_rate}%</td>
                <td>
                    <button title="編集" onClick={() => setEditing(true)}>
                        <span>✏️</span>
                    </button>
                    <button title="削除" onClick={handleDelete}>
                        <span>🗑️</span>
                    </button>
                    {editing && (
                        <TaskEditModal
                            task={task}
                            userMap={userMap}
                            statusMap={statusMap}
                            categoryMap={categoryMap}
                            onSave={handleEditSave}
                            onClose={() => setEditing(false)}
                        />
                    )}
                </td>
            </tr>
        </>
    );
};

export default TaskItem;
