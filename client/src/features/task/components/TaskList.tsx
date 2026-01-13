import React from "react";
import TaskItem from "./TaskItem";
import Task from "../../../types/task.interface";

interface TaskListProps {
    tasks: Task[];
    userMap?: { [key: number]: string };
    statusMap?: { [key: number]: string };
    categoryMap?: { [key: number]: string };
    onUpdate?: (task: Task) => void;
    onDelete?: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, userMap, statusMap, categoryMap, onUpdate, onDelete }) => {
    if (!tasks || tasks.length === 0) {
        return <div>タスク未登録</div>;
    }
    return (
        <table>
            <thead>
                <tr>
                    <th rowSpan={2}>タスク名</th>
                    <th rowSpan={2}>担当者</th>
                    <th rowSpan={2}>ステータス</th>
                    <th colSpan={3}>予定</th>
                    <th colSpan={3}>実績</th>
                    <th rowSpan={2}>進捗率</th>
                    <th rowSpan={2}>アクション</th>
                </tr>
                <tr>
                    <th>開始日</th>
                    <th>終了日</th>
                    <th>工数</th>
                    <th>開始日</th>
                    <th>終了日</th>
                    <th>工数</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <TaskItem
                        task={task}
                        key={task.id}
                        userMap={userMap}
                        statusMap={statusMap}
                        categoryMap={categoryMap}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default TaskList;
