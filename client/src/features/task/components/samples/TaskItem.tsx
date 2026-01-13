import React from "react";
import Task from "../../../../types/task.interface";
import style from "./TaskItem.module.css";

interface TaskItemProps {
    task: Task;
    userMap?: { [key: number]: string };
    statusMap?: { [key: number]: string };
    categoryMap?: { [key: number]: string };
    onEdit?: (taskId: number) => void;
    onDetail?: (taskId: number) => void;
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

const colourForPriority = (p: number) => {
    if (p >= 8) return "#d32f2f";
    if (p >= 5) return "#f57c00";
    return "#388e3c";
};

const getLabel = (map?: { [key: number]: string }, id?: number) => {
    if (!map || id === undefined) return id;
    return map[id] || id;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, userMap, statusMap, categoryMap, onEdit, onDetail }) => {
    return (
        <div className={style.card}>
            <div className={style.header}>
                <div className={style.title}>{task.name}</div>
                <div
                    className={style.priority}
                    style={{ background: colourForPriority(task.priority) }}
                >
                    優先 {task.priority}
                </div>
            </div>

            <div className={style.metaRow}>
                <div className={style.metaItem}>
                    <strong>担当者:</strong> {getLabel(userMap, task.user_id)}
                </div>
                <div className={style.metaItem}>
                    <strong>ステータス:</strong> {getLabel(statusMap, task.status_id)}
                </div>
                <div className={style.metaItem}>
                    <strong>進捗:</strong> {task.progress_rate}%
                </div>
            </div>

            <div className={style.row}>
                <div>予定：</div>
                <div>
                    {formatDate(task.planned_start_date)} →{" "}
                    {formatDate(task.planned_end_date)}
                </div>
                <div>{task.planned_effort}h</div>
            </div>
            <div className={style.row}>
                <div>実績：</div>
                <div>
                    {formatDate(task.actual_start_date)} →{" "}
                    {formatDate(task.actual_end_date)}
                </div>
                <div>{task.actual_effort}h</div>
            </div>

            <div className={style.progressBarWrap} aria-hidden>
                <div
                    className={style.progressBar}
                    style={{
                        width: `${Math.max(
                            0,
                            Math.min(100, task.progress_rate)
                        )}%`,
                    }}
                />
            </div>

            <div className={style.footer}>
                <div className={style.footerItem}>
                    <small>作成: {formatDate(task.created_at)}</small>
                </div>
                <div className={style.footerItem}>
                    <small>更新: {formatDate(task.updated_at)}</small>
                </div>
            </div>

            <div className={style.buttonRow}>
                <button
                    className={style.btnDetail}
                    onClick={() => onDetail?.(task.id)}
                >
                    詳細
                </button>
                <button
                    className={style.btnEdit}
                    onClick={() => onEdit?.(task.id)}
                >
                    編集
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
