import React from "react";
import Task from "../../../../types/task.interface";
import style from "./TaskModal.module.css";

interface TaskDetailModalProps {
    task: Task;
    userMap?: { [key: number]: string };
    statusMap?: { [key: number]: string };
    categoryMap?: { [key: number]: string };
    onClose: () => void;
}

const formatDate = (d?: string) => {
    if (!d) return "-";
    try {
        const dt = new Date(d);
        if (isNaN(dt.getTime())) return d;
        return dt.toLocaleDateString("ja-JP");
    } catch {
        return d;
    }
};

const getLabel = (map?: { [key: number]: string }, id?: number) => {
    if (!map || id === undefined) return id;
    return map[id] || id;
};

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
    task,
    userMap,
    statusMap,
    categoryMap,
    onClose,
}) => {
    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <div className={style.header}>
                    <h2 className={style.title}>タスク詳細</h2>
                    <button className={style.closeBtn} onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className={style.body}>
                    <div className={style.section}>
                        <h3>基本情報</h3>
                        <div className={style.row}>
                            <label>タスク名</label>
                            <div>{task.name}</div>
                        </div>
                        <div className={style.row}>
                            <label>優先度</label>
                            <div>{task.priority}</div>
                        </div>
                        <div className={style.row}>
                            <label>担当者</label>
                            <div>{getLabel(userMap, task.user_id)}</div>
                        </div>
                        <div className={style.row}>
                            <label>ステータス</label>
                            <div>{getLabel(statusMap, task.status_id)}</div>
                        </div>
                        <div className={style.row}>
                            <label>カテゴリ</label>
                            <div>{getLabel(categoryMap, task.category_id)}</div>
                        </div>
                        <div className={style.row}>
                            <label>進捗率</label>
                            <div>{task.progress_rate}%</div>
                        </div>
                    </div>

                    <div className={style.section}>
                        <h3>予定</h3>
                        <div className={style.row}>
                            <label>開始日</label>
                            <div>{formatDate(task.planned_start_date)}</div>
                        </div>
                        <div className={style.row}>
                            <label>終了日</label>
                            <div>{formatDate(task.planned_end_date)}</div>
                        </div>
                        <div className={style.row}>
                            <label>見積工数</label>
                            <div>{task.planned_effort} h</div>
                        </div>
                    </div>

                    <div className={style.section}>
                        <h3>実績</h3>
                        <div className={style.row}>
                            <label>開始日</label>
                            <div>{formatDate(task.actual_start_date)}</div>
                        </div>
                        <div className={style.row}>
                            <label>終了日</label>
                            <div>{formatDate(task.actual_end_date)}</div>
                        </div>
                        <div className={style.row}>
                            <label>実績工数</label>
                            <div>{task.actual_effort} h</div>
                        </div>
                    </div>

                    <div className={style.section}>
                        <h3>依存関係</h3>
                        <div className={style.row}>
                            <label>前タスク ID</label>
                            <div>{task.pre_task_id || "-"}</div>
                        </div>
                        <div className={style.row}>
                            <label>次タスク ID</label>
                            <div>{task.next_task_id || "-"}</div>
                        </div>
                    </div>

                    <div className={style.section}>
                        <h3>メタ情報</h3>
                        <div className={style.row}>
                            <label>作成日時</label>
                            <div>{formatDate(task.created_at)}</div>
                        </div>
                        <div className={style.row}>
                            <label>更新日時</label>
                            <div>{formatDate(task.updated_at)}</div>
                        </div>
                    </div>
                </div>

                <div className={style.footer}>
                    <button className={style.btnClose} onClick={onClose}>
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;
