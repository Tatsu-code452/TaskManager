import React from "react";
import Task from "../../../../../types/task.interface";
import { TaskRow } from "./TaskRow";
import { TaskRowEdit } from "./TaskRowEdit";

export interface TaskTableBodyProps {
    tasks: Task[];
    save: (task: Partial<Task>) => void;
    remove: (id: number) => void;
    setEdit: (id: number) => void;
    setView: () => void;
    isEditing: (id: number) => boolean;
    changeSelectedTask: (task: Partial<Task>) => void;
}

export const TaskTableBody = ({
    tasks,
    save,
    remove,
    setEdit,
    setView,
    isEditing,
    changeSelectedTask,
}: TaskTableBodyProps) => {
    return (
        <tbody>
            {tasks.map((task) =>
                isEditing(task.id) ? (
                    <TaskRowEdit
                        key={task.id}
                        task={task}
                        onSave={save}
                        onCancel={setView}
                    />
                ) : (
                    <TaskRow
                        key={task.id}
                        task={task}
                        onEdit={() => {
                            changeSelectedTask(task);
                            setEdit(task.id);
                        }}
                        onDelete={() => remove(task.id)}
                        onChangeSelectedTask={() => changeSelectedTask(task)}
                    />
                ),
            )}
        </tbody>
    );
};

export default React.memo(TaskTableBody);
