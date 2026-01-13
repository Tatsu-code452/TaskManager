import Task from "../../../../types/task.interface";
import React from "react";
import TaskItem from "./TaskItem";
import style from "./TaskList.module.css";

interface TaskListProps {
    tasks: Task[];
    userMap?: { [key: number]: string };
    statusMap?: { [key: number]: string };
    categoryMap?: { [key: number]: string };
    onEdit?: (taskId: number) => void;
    onDetail?: (taskId: number) => void;
}
const TaskList: React.FC<TaskListProps> = ({ tasks, userMap, statusMap, categoryMap, onEdit, onDetail }) => {
    if (!tasks || tasks.length === 0) {
        return <div className={style.empty}>タスクがありません</div>;
    }

    return (
        <div className={style.grid}>
            {tasks.map((task) => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    userMap={userMap}
                    statusMap={statusMap}
                    categoryMap={categoryMap}
                    onEdit={onEdit}
                    onDetail={onDetail}
                />
            ))}
        </div>
    );
};

const styles: { [k: string]: React.CSSProperties } = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 12,
        alignItems: "start",
    },
    empty: {
        color: "#666",
        padding: 16,
    },
};

export default TaskList;