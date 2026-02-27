import { Button } from "../../../../../components/Button";
import { useCsvModalController } from "../../../hooks/controller/useCsvModalController";
import styles from "./csv.module.css";

export const CsvImportModal = ({ isOpenCsv, addTasks, onClose }) => {
    const { text, errors, onChangeText, handleImport, handleClose } =
        useCsvModalController({ addTasks, onClose });

    // アンマウント
    if (!isOpenCsv) return null;

    return (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
            <div className={styles.modal}>
                <h2>CSV から一括登録</h2>

                <textarea
                    className={styles.csvTextarea}
                    value={text}
                    onChange={onChangeText}
                    placeholder="CSV を貼り付けてください"
                />

                {errors.length > 0 && (
                    <div className={styles.errorBox}>
                        {errors.map((e, i) => (
                            <p key={i}>{e}</p>
                        ))}
                    </div>
                )}

                <div className={styles.modalActions}>
                    <Button variant="primary" onClick={handleImport}>
                        登録
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        閉じる
                    </Button>
                </div>
            </div>
        </div>
    );
};
