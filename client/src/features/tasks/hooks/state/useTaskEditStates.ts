import { useState } from "react";
import { TaskRowMode, TaskWithUIState } from "../../types/types";

export const useTaskEditStates = () => {
    const [mode, setMode] = useState<TaskRowMode>({ type: "view" });
    const [selectedTask, setSelectedTask] = useState<TaskWithUIState | null>(null);
    const [showCsv, setShowCsv] = useState(false);

    // --- Mode operations ---
    const setNew = () => setMode({ type: "new" });
    const setView = () => setMode({ type: "view" });
    const setEdit = (id: number) => setMode({ type: "edit", id });

    // --- selectedTask operations ---
    const changeSelectedTask = (task: TaskWithUIState | null) => setSelectedTask(task);

    // ---showCsv operations ---
    const openCsv = () => setShowCsv(true);
    const closeCsv = () => setShowCsv(false);
    const toggleCsv = () => setShowCsv(prev => !prev);

    return {
        mode, selectedTask, showCsv,
        setNew, setEdit, setView,
        changeSelectedTask,
        openCsv, closeCsv, toggleCsv,
    }
}