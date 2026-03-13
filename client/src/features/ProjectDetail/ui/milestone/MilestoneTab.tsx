import { useMilestoneController } from "../../hooks/controller/useMilestoneController";
import { MilestoneStates } from "../../hooks/state/useMilestoneStates";
import { MilestoneEditModal } from "./MilestoneEditModal";
import styles from "./MilestoneTab.module.css";

interface MilestoneTabProps {
    projectId: string;
    states: MilestoneStates;
}
export const MilestoneTab = ({ projectId, states }: MilestoneTabProps) => {
    const { milestones, showModal, setShowModal, mode, editingMilestone } =
        states;

    const { create, update, remove, handleChange, handleShowModal } =
        useMilestoneController(projectId, states);

    return (
        <div className={styles.page_container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>マイルストーン一覧</div>
                <button
                    className={`${styles.button} ${styles.button_primary}`}
                    onClick={() => handleShowModal("new", null)}
                >
                    新規マイルストーン追加
                </button>

                <table className={styles.project_table}>
                    <thead>
                        <tr>
                            <th rowSpan={2}>名称</th>
                            <th>開始日</th>
                            <th>終了日</th>
                            <th rowSpan={2}>ステータス</th>
                            <th rowSpan={2}>編集</th>
                        </tr>
                        <tr>
                            <th>開始日</th>
                            <th>終了日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {milestones.map((m) => (
                            <>
                                <tr key={m.id}>
                                    <td rowSpan={2}>{m.name}</td>
                                    <td>{m.plannedStartDate ?? "-"}</td>
                                    <td>{m.plannedEndDate ?? "-"}</td>
                                    <td rowSpan={2}>
                                        {" "}
                                        <span
                                            className={`${styles.status} ${styles[`status_${m.status}`]}`}
                                        >
                                            {m.status}
                                        </span>
                                    </td>
                                    <td rowSpan={2}>
                                        <button
                                            className={styles.icon_button}
                                            onClick={() =>
                                                handleShowModal("edit", m)
                                            }
                                        >
                                            ✎
                                        </button>
                                        <button
                                            className={styles.icon_button}
                                            onClick={() => remove(m.id)}
                                        >
                                            🗑
                                        </button>
                                    </td>
                                </tr>
                                <tr key={m.id + "-actual"}>
                                    <td>{m.actualStartDate ?? "-"}</td>
                                    <td>{m.actualEndDate ?? "-"}</td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <MilestoneEditModal
                    edtingMilestone={editingMilestone}
                    handleChange={handleChange}
                    onClose={() => setShowModal(false)}
                    onSave={mode === "new" ? create : update}
                />
            )}
        </div>
    );
};
