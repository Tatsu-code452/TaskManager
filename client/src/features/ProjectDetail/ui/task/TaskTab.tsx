import commonStyles from "../../../../common.module.css";
import { Button } from "../../../../components";
import { useTaskController } from "../../hooks/controller/useTaskController";
import { TaskStates } from "../../hooks/state/useTaskStates";
import { TaskEditModal } from "./TaskEditModal";
import styles from "./TaskTab.module.css";
import TaskTable from "./TaskTable";

interface TaskTabProps {
    projectId: string;
    states: TaskStates;
}

export const TaskTab = ({ projectId, states }: TaskTabProps) => {
    const { tasks, showModal, setShowModal, mode, form } = states;

    const { create, update, remove, handleChange, handleShowModal } =
        useTaskController(projectId, states);

    return (
        <div className={commonStyles.container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>タスク一覧</div>

                <div className={styles.header_actions}>
                    <Button
                        variant="primary"
                        onClick={() =>
                            handleShowModal({ mode: "new", task: null })
                        }
                    >
                        新規作成
                    </Button>
                </div>

                <div className={commonStyles.table_wrapper}>
                    <TaskTable
                        tasks={tasks}
                        remove={remove}
                        handleShowModal={handleShowModal}
                    />
                </div>

                {showModal && (
                    <TaskEditModal
                        form={form}
                        onChange={handleChange}
                        onSubmit={mode === "new" ? create : update}
                        onClose={() => setShowModal(false)}
                        mode={mode}
                    />
                )}
            </div>
        </div>
    );
};
