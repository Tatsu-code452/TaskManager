import { TaskStatus } from "../../../../types/db/task";
import { Task, statusToLabel } from "../../types/task";
import styles from "./TaskTab.module.css";

interface TaskEditModalProps {
    editingTask: Task;
    handleChange: (target: string, value: string) => void;
    onClose: () => void;
    onSave: () => void;
}

export const TaskEditModal = ({
    editingTask,
    handleChange,
    onClose,
    onSave,
}: TaskEditModalProps) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h3>タスク</h3>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>名称</label>
                    <input
                        className={styles.detail_input}
                        value={editingTask.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>予定開始</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={editingTask.plannedStart}
                        onChange={(e) =>
                            handleChange("plannedStart", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>予定終了</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={editingTask.plannedEnd}
                        onChange={(e) =>
                            handleChange("plannedEnd", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>実績開始</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={editingTask.actualStart}
                        onChange={(e) =>
                            handleChange("actualStart", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>実績終了</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={editingTask.actualEnd}
                        onChange={(e) =>
                            handleChange("actualEnd", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>予定工数</label>
                    <input
                        className={styles.detail_input}
                        type="number"
                        value={editingTask.plannedHours}
                        onChange={(e) =>
                            handleChange("plannedHours", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>実績工数</label>
                    <input
                        className={styles.detail_input}
                        type="number"
                        value={editingTask.actualHours}
                        onChange={(e) =>
                            handleChange("actualHours", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>進捗率</label>
                    <input
                        className={styles.detail_input}
                        type="number"
                        value={editingTask.progressRate}
                        onChange={(e) =>
                            handleChange("progressRate", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>ステータス</label>
                    <select
                        className={styles.detail_select}
                        value={editingTask.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                    >
                        {Object.values(TaskStatus).map((v) => (
                            <option key={v} value={v}>
                                {statusToLabel(v)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.detail_buttons}>
                    <button
                        className={`${styles.button} ${styles.button_primary}`}
                        onClick={onSave}
                    >
                        保存
                    </button>
                    <button
                        className={`${styles.button} ${styles.button_secondary}`}
                        onClick={onClose}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
};
