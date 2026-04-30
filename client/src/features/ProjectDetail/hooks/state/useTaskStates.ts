import { useState } from "react";
import { TaskPayload, TaskRow } from "../../../../types/db/task";

export const useTaskStates = () => {
    // tab
    const [tasks, setTasks] = useState<TaskRow[]>([]);
    const [loading, setLoading] = useState(false);

    // dialog
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [form, setForm] = useState<TaskPayload | null>(null);

    return {
        tasks, setTasks,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        form, setForm,
    };
};

export type TaskStates = ReturnType<typeof useTaskStates>;
