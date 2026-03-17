import { useDefectController } from "../../hooks/controller/useDefectController";
import { DefectStates } from "../../hooks/state/useDefectStates";
import { DefectEditModal } from "./DefectEditModal";
import styles from "./DefectTab.module.css";

interface DefectTabProps {
    projectId: string;
    states: DefectStates;
}

export const DefectTab = ({ projectId, states }: DefectTabProps) => {
    const { defects, showModal, setShowModal, mode, editingDefect } = states;

    const { create, update, remove, handleChange, handleShowModal } =
        useDefectController(projectId, states);

    return (
        <div className={styles.page_container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>欠陥一覧</div>

                <button
                    className={`${styles.button} ${styles.button_primary}`}
                    onClick={() => handleShowModal("new", null)}
                >
                    新規欠陥
                </button>

                <table className={styles.project_table}>
                    <thead>
                        <tr>
                            <th>タイトル</th>
                            <th>重大度</th>
                            <th>ステータス</th>
                            <th>詳細</th>
                            <th>編集</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defects.map((d) => (
                            <tr key={d.id}>
                                <td>{d.title}</td>
                                <td>{d.severity}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${styles[`status_${d.status}`]}`}
                                    >
                                        {d.status}
                                    </span>
                                </td>
                                <td>{d.description ?? "-"}</td>
                                <td>
                                    <button
                                        className={styles.icon_button}
                                        onClick={() =>
                                            handleShowModal("edit", d)
                                        }
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className={styles.icon_button}
                                        onClick={() => remove(d.id)}
                                    >
                                        🗑
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <DefectEditModal
                    editingDefect={editingDefect}
                    handleChange={handleChange}
                    onClose={() => setShowModal(false)}
                    onSave={mode === "new" ? create : update}
                />
            )}
        </div>
    );
};
