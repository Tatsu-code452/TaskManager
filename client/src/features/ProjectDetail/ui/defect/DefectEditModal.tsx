import { DefectSeverity, DefectStatus } from "../../../../types/db/defect";
import { Defect } from "../../types/defect";
import styles from "./DefectTab.module.css";

interface DefectEditModalProps {
    editingDefect: Defect;
    handleChange: (target: string, value: string) => void;
    onClose: () => void;
    onSave: () => void;
}

export const DefectEditModal = ({
    editingDefect,
    handleChange,
    onClose,
    onSave,
}: DefectEditModalProps) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h3>欠陥</h3>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>タイトル</label>
                    <input
                        className={styles.detail_input}
                        value={editingDefect.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>内容</label>
                    <textarea
                        className={styles.detail_input}
                        value={editingDefect.description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>重大度</label>
                    <select
                        className={styles.detail_select}
                        value={editingDefect.severity}
                        onChange={(e) =>
                            handleChange("severity", e.target.value)
                        }
                    >
                        {Object.values(DefectSeverity).map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>ステータス</label>
                    <select
                        className={styles.detail_select}
                        value={editingDefect.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                    >
                        {Object.values(DefectStatus).map((v) => (
                            <option key={v} value={v}>
                                {v}
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
