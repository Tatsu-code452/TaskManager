import { MilestoneStatus } from "../../../../types/db/milestone";
import { Milestone, statusToLabel } from "../../types/milestone";
import styles from "./MilestoneTab.module.css";

interface MilestoneEditModalProps {
    edtingMilestone: Milestone;
    handleChange: (target: string, value: string) => void;
    onClose: () => void;
    onSave: () => void;
}

export const MilestoneEditModal = ({
    edtingMilestone,
    handleChange,
    onClose,
    onSave,
}: MilestoneEditModalProps) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h3>マイルストーン</h3>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>名称</label>
                    <input
                        className={styles.detail_input}
                        value={edtingMilestone.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>開始予定日</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={edtingMilestone.plannedStartDate}
                        onChange={(e) =>
                            handleChange("plannedStartDate", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>終了予定日</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={edtingMilestone.plannedEndDate}
                        onChange={(e) =>
                            handleChange("plannedEndDate", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>開始実績日</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={edtingMilestone.actualStartDate}
                        onChange={(e) =>
                            handleChange("actualStartDate", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>終了実績日</label>
                    <input
                        className={styles.detail_input}
                        type="date"
                        value={edtingMilestone.actualEndDate}
                        onChange={(e) =>
                            handleChange("actualEndDate", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>ステータス</label>
                    <select
                        className={styles.detail_select}
                        value={edtingMilestone.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                    >
                        {Object.values(MilestoneStatus).map((v) => (
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
