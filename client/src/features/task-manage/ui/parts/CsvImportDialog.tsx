import React, { useState } from "react";
import styles from "./CsvImportDialog.module.css";

export const CsvImportDialog = ({
    open,
    onClose,
    onSubmit,
}: {
    open: boolean;
    onClose: () => void;
    onSubmit: (task: string) => Promise<void>;
}) => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    if (!open) return null;

    const handleOk = async () => {
        try {
            setError("");
            await onSubmit(text);
            onClose();
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h2 className={styles.title}>CSV貼り付け</h2>

                <textarea
                    className={styles.textarea}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={`例:\n設計,API設計,2024-01-01,2024-01-05,20\n実装,認証機能,2024-01-06,2024-01-10,0`}
                />

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.actions}>
                    <button onClick={onClose}>キャンセル</button>
                    <button className={styles.okButton} onClick={handleOk}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CsvImportDialog);
