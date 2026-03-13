import { useState } from "react";
import { Phase } from "../../types/phase";
import { Task } from "../../types/task";

export const useTaskStates = () => {
    // tab
    const [phases, setPhases] = useState<Phase[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    // dialog
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    return {
        phases, setPhases,
        tasks, setTasks,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        editingTask, setEditingTask
    };
};

export type TaskStates = ReturnType<typeof useTaskStates>;
