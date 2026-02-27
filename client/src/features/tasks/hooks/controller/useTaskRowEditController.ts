import { useState } from "react";
import Task from "../../../../types/task.interface";
import { createEmptyTask } from "../../domain/logic/createEmptyTask";
import { taskToEditForm } from "../../domain/mapping/taskToEditForm";
import { taskToPatch } from "../../domain/mapping/taskToPatch";
import { TaskRowEditForm } from "../../types/types";


export const useTaskRowEditController = (
    task: Task,
    onSave: (patch: Partial<Task>) => void,
    onCancel: () => void,
) => {
    if (!task) task = createEmptyTask();

    const [draft, setDraft] = useState<TaskRowEditForm>(taskToEditForm(task));

    const update = <K extends keyof TaskRowEditForm>(key: K, value: unknown) => {
        setDraft(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        const patch = taskToPatch(task, draft);
        onSave(patch);
    };

    const handleCancel = () => {
        onCancel();
    };

    return {
        vm: draft,
        update,
        handleSave,
        handleCancel,
    };
};