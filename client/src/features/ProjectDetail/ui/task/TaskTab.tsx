import { useTaskController } from "../../hooks/controller/useTaskController";
import { TaskStates } from "../../hooks/state/useTaskStates";
import { TaskEditModal } from "./TaskEditModal";
import styles from "./TaskTab.module.css";

interface TaskTabProps {
    projectId: string;
    states: TaskStates;
}

export const TaskTab = ({ projectId, states }: TaskTabProps) => {
    const { phases, tasks, showModal, setShowModal, mode, editingTask } =
        states;

    const { create, update, remove, handleChange, handleShowModal } =
        useTaskController(projectId, states);

    return (
        <div className={styles.page_container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>WBS（タスク一覧）</div>

                <button
                    className={`${styles.button} ${styles.button_primary}`}
                    onClick={() => handleShowModal("new", null)}
                >
                    新規タスク追加
                </button>

                {phases.map((phase) => (
                    <div key={phase.id} className={styles.phase_block}>
                        <h4 className={styles.phase_title}>
                            {phase.order}. {phase.name}
                        </h4>

                        <table className={styles.project_table}>
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>予定開始</th>
                                    <th>予定終了</th>
                                    <th>実績開始</th>
                                    <th>実績終了</th>
                                    <th>予定工数</th>
                                    <th>実績工数</th>
                                    <th>進捗率</th>
                                    <th>ステータス</th>
                                    <th>編集</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tasks
                                    .filter((t) => t.phaseId === phase.id)
                                    .map((t) => (
                                        <tr key={t.id}>
                                            <td>{t.name}</td>
                                            <td>{t.plannedStart ?? "-"}</td>
                                            <td>{t.plannedEnd ?? "-"}</td>
                                            <td>{t.actualStart ?? "-"}</td>
                                            <td>{t.actualEnd ?? "-"}</td>
                                            <td>{t.plannedHours ?? "-"}</td>
                                            <td>{t.actualHours ?? "-"}</td>
                                            <td>{t.progressRate ?? 0}%</td>
                                            <td>
                                                <span
                                                    className={`${styles.status} ${styles[`status_${t.status}`]}`}
                                                >
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className={
                                                        styles.icon_button
                                                    }
                                                    onClick={() =>
                                                        handleShowModal(
                                                            "edit",
                                                            t,
                                                        )
                                                    }
                                                >
                                                    ✎
                                                </button>
                                                <button
                                                    className={
                                                        styles.icon_button
                                                    }
                                                    onClick={() => remove(t.id)}
                                                >
                                                    🗑
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {showModal && (
                <TaskEditModal
                    editingTask={editingTask}
                    handleChange={handleChange}
                    onClose={() => setShowModal(false)}
                    onSave={mode === "new" ? create : update}
                />
            )}
        </div>
    );
};
