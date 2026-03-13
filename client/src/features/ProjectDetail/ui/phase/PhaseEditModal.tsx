import { Phase } from "../../types/phase";
import styles from "./PhaseTab.module.css";

interface PhaseEditModalProps {
    editingPhase: Phase;
    handleChange: (target: string, value: string) => void;
    onClose: () => void;
    onSave: () => void;
}

export const PhaseEditModal = ({
    editingPhase,
    handleChange,
    onClose,
    onSave,
}: PhaseEditModalProps) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h3>フェーズ</h3>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>名称</label>
                    <input
                        className={styles.detail_input}
                        value={editingPhase.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>順序</label>
                    <input
                        className={styles.detail_input}
                        type="number"
                        value={editingPhase.order}
                        onChange={(e) => handleChange("order", e.target.value)}
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>
                        入力物（カンマ区切り）
                    </label>
                    <input
                        className={styles.detail_input}
                        value={editingPhase.inputs?.join(", ") ?? ""}
                        onChange={(e) => handleChange("inputs", e.target.value)}
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>
                        出力物（カンマ区切り）
                    </label>
                    <input
                        className={styles.detail_input}
                        value={editingPhase.outputs?.join(", ") ?? ""}
                        onChange={(e) =>
                            handleChange("outputs", e.target.value)
                        }
                    />
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
