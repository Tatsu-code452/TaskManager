import React, { useState } from "react";
import Task from "../../../../types/task.interface";
import style from "./TaskModal.module.css";

interface TaskEditModalProps {
    task: Task;
    userMap?: { [key: number]: string };
    statusMap?: { [key: number]: string };
    categoryMap?: { [key: number]: string };
    onSave: (updatedTask: Task) => void;
    onClose: () => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({
    task,
    userMap,
    statusMap,
    categoryMap,
    onSave,
    onClose,
}) => {
    const [formData, setFormData] = useState<Task>(task);

    const handleChange = (field: keyof Task, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <div className={style.header}>
                    <h2 className={style.title}>タスク編集</h2>
                    <button className={style.closeBtn} onClick={onClose}>
                        ✕
                    </button>
                </div>

                <form className={style.body} onSubmit={handleSubmit}>
                    <div className={style.section}>
                        <h3>基本情報</h3>

                        <div className={style.formRow}>
                            <label>タスク名 *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>優先度 (1-10) *</label>
                            <input
                                type="number"
                                min={1}
                                max={10}
                                value={formData.priority}
                                onChange={(e) =>
                                    handleChange("priority", parseInt(e.target.value))
                                }
                                required
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>進捗率 (0-100) *</label>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={formData.progress_rate}
                                onChange={(e) =>
                                    handleChange("progress_rate", parseInt(e.target.value))
                                }
                                required
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>担当者 ID</label>
                            <input
                                type="number"
                                value={formData.user_id}
                                onChange={(e) =>
                                    handleChange("user_id", parseInt(e.target.value))
                                }
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>ステータス ID</label>
                            <input
                                type="number"
                                value={formData.status_id}
                                onChange={(e) =>
                                    handleChange("status_id", parseInt(e.target.value))
                                }
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>カテゴリ ID</label>
                            <input
                                type="number"
                                value={formData.category_id}
                                onChange={(e) =>
                                    handleChange("category_id", parseInt(e.target.value))
                                }
                            />
                        </div>
                    </div>

                    <div className={style.section}>
                        <h3>予定</h3>

                        <div className={style.formRow}>
                            <label>開始日</label>
                            <input
                                type="date"
                                value={
                                    formData.planned_start_date
                                        ? new Date(formData.planned_start_date)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "planned_start_date",
                                        e.target.value
                                            ? new Date(e.target.value).toISOString()
                                            : ""
                                    )
                                }
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>終了日</label>
                            <input
                                type="date"
                                value={
                                    formData.planned_end_date
                                        ? new Date(formData.planned_end_date)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "planned_end_date",
                                        e.target.value
                                            ? new Date(e.target.value).toISOString()
                                            : ""
                                    )
                                }
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>見積工数 (h)</label>
                            <input
                                type="number"
                                value={formData.planned_effort}
                                onChange={(e) =>
                                    handleChange("planned_effort", parseInt(e.target.value))
                                }
                            />
                        </div>
                    </div>

                    <div className={style.section}>
                        <h3>実績</h3>

                        <div className={style.formRow}>
                            <label>開始日</label>
                            <input
                                type="date"
                                value={
                                    formData.actual_start_date
                                        ? new Date(formData.actual_start_date)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "actual_start_date",
                                        e.target.value
                                            ? new Date(e.target.value).toISOString()
                                            : ""
                                    )
                                }
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>終了日</label>
                            <input
                                type="date"
                                value={
                                    formData.actual_end_date
                                        ? new Date(formData.actual_end_date)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "actual_end_date",
                                        e.target.value
                                            ? new Date(e.target.value).toISOString()
                                            : ""
                                    )
                                }
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>実績工数 (h)</label>
                            <input
                                type="number"
                                value={formData.actual_effort}
                                onChange={(e) =>
                                    handleChange("actual_effort", parseInt(e.target.value))
                                }
                            />
                        </div>
                    </div>

                    <div className={style.section}>
                        <h3>依存関係</h3>

                        <div className={style.formRow}>
                            <label>前タスク ID</label>
                            <input
                                type="number"
                                value={formData.pre_task_id || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "pre_task_id",
                                        e.target.value ? parseInt(e.target.value) : null
                                    )
                                }
                            />
                        </div>

                        <div className={style.formRow}>
                            <label>次タスク ID</label>
                            <input
                                type="number"
                                value={formData.next_task_id || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "next_task_id",
                                        e.target.value ? parseInt(e.target.value) : null
                                    )
                                }
                            />
                        </div>
                    </div>
                </form>

                <div className={style.footer}>
                    <button className={style.btnCancel} onClick={onClose}>
                        キャンセル
                    </button>
                    <button className={style.btnSave} onClick={handleSubmit}>
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskEditModal;
