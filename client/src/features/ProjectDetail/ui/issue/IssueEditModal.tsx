import { IssuePriority, IssueStatus } from "../../../../types/db/issue";
import { Issue } from "../../types/issue";
import styles from "./IssueTab.module.css";

interface IssueEditModalProps {
    editingIssue: Issue;
    handleChange: (target: string, value: string) => void;
    onClose: () => void;
    onSave: () => void;
}

export const IssueEditModal = ({
    editingIssue,
    handleChange,
    onClose,
    onSave,
}: IssueEditModalProps) => {
    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h3>課題</h3>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>タイトル</label>
                    <input
                        className={styles.detail_input}
                        value={editingIssue.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>内容</label>
                    <textarea
                        className={styles.detail_input}
                        value={editingIssue.description}
                        onChange={(e) =>
                            handleChange("description", e.target.value)
                        }
                    />
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>ステータス</label>
                    <select
                        className={styles.detail_select}
                        value={editingIssue.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                    >
                        {Object.values(IssueStatus).map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>優先度</label>
                    <select
                        className={styles.detail_select}
                        value={editingIssue.priority}
                        onChange={(e) =>
                            handleChange("priority", e.target.value)
                        }
                    >
                        {Object.values(IssuePriority).map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.detail_row}>
                    <label className={styles.detail_label}>担当者</label>
                    <input
                        className={styles.detail_input}
                        value={editingIssue.owner}
                        onChange={(e) => handleChange("owner", e.target.value)}
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
