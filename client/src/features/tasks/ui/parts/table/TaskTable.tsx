import Task from "../../../../../types/task.interface";
import styles from "./table.module.css";
import TaskTableBody from "./TaskTableBody";
import TaskTableHeader from "./TaskTableHeader";

export interface TaskTableProps {
    tasks: Task[];
    save: (task: Partial<Task>) => void;
    remove: (id: number) => void;
    setEdit: (id: number) => void;
    setView: () => void;
    isEditing: (id: number) => boolean;
    changeSelectedTask: (task: Partial<Task>) => void;
}

export const TaskTable = ({
    tasks,
    save,
    remove,
    setEdit,
    setView,
    isEditing,
    changeSelectedTask,
}: TaskTableProps) => {
    return (
        <table className={styles.table}>
            <TaskTableHeader />
            <TaskTableBody
                tasks={tasks}
                save={save}
                remove={remove}
                setEdit={setEdit}
                setView={setView}
                isEditing={isEditing}
                changeSelectedTask={changeSelectedTask}
            />
        </table>
    );
};
