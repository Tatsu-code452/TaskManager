import { usePhaseController } from "../../hooks/controller/usePhaseController";
import { PhaseStates } from "../../hooks/state/usePhaseStates";
import { PhaseEditModal } from "./PhaseEditModal";
import styles from "./PhaseTab.module.css";

interface PhaseTabProps {
    projectId: string;
    states: PhaseStates;
}

export const PhaseTab = ({ projectId, states }: PhaseTabProps) => {
    const { phases, showModal, setShowModal, mode, editingPhase } = states;

    const { create, update, remove, handleChange, handleShowModal } =
        usePhaseController(projectId, states);

    return (
        <div className={styles.container}>
            <button
                className={styles.newButton}
                onClick={() => handleShowModal("new", null)}
            >
                新規フェーズ追加
            </button>

            {showModal && (
                <PhaseEditModal
                    editingPhase={editingPhase}
                    handleChange={handleChange}
                    onClose={() => setShowModal(false)}
                    onSave={mode === "new" ? create : update}
                />
            )}

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>名称</th>
                        <th>順序</th>
                        <th>入力物</th>
                        <th>出力物</th>
                        <th>編集</th>
                    </tr>
                </thead>
                <tbody>
                    {phases.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.order}</td>
                            <td>{p.inputs?.join(", ") ?? "-"}</td>
                            <td>{p.outputs?.join(", ") ?? "-"}</td>
                            <td>
                                <button
                                    className={styles.icon_button}
                                    onClick={() => handleShowModal("edit", p)}
                                >
                                    ✎
                                </button>
                                <button
                                    className={styles.icon_button}
                                    onClick={() => remove(p.id)}
                                >
                                    🗑
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
