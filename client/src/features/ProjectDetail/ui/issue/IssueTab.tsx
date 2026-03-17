import { useIssueController } from "../../hooks/controller/useIssueController";
import { IssueStates } from "../../hooks/state/useIssueStates";
import { IssueEditModal } from "./IssueEditModal";
import styles from "./IssueTab.module.css";

interface IssueTabProps {
    projectId: string;
    states: IssueStates;
}

export const IssueTab = ({ projectId, states }: IssueTabProps) => {
    const { issues, showModal, setShowModal, mode, editingIssue } = states;

    const { create, update, remove, handleChange, handleShowModal } =
        useIssueController(projectId, states);

    return (
        <div className={styles.page_container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>課題一覧</div>

                <button
                    className={`${styles.button} ${styles.button_primary}`}
                    onClick={() => handleShowModal("new", null)}
                >
                    新規課題
                </button>

                <table className={styles.project_table}>
                    <thead>
                        <tr>
                            <th>タイトル</th>
                            <th>ステータス</th>
                            <th>優先度</th>
                            <th>担当</th>
                            <th>詳細</th>
                            <th>編集</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((i) => (
                            <tr key={i.id}>
                                <td>{i.title}</td>
                                <td>
                                    <span
                                        className={`${styles.status} ${styles[`status_${i.status}`]}`}
                                    >
                                        {i.status}
                                    </span>
                                </td>
                                <td>{i.priority}</td>
                                <td>{i.owner}</td>
                                <td>{i.description}</td>
                                <td>
                                    <button
                                        className={styles.icon_button}
                                        onClick={() =>
                                            handleShowModal("edit", i)
                                        }
                                    >
                                        ✎
                                    </button>
                                    <button
                                        className={styles.icon_button}
                                        onClick={() => remove(i.id)}
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
                <IssueEditModal
                    editingIssue={editingIssue}
                    handleChange={handleChange}
                    onClose={() => setShowModal(false)}
                    onSave={mode === "new" ? create : update}
                />
            )}
        </div>
    );
};
