import { useMemo, useState } from "react";
import Task from "../../../../types/task.interface";
import { toString } from "../../domain/mapping/converter/string";
import { TaskFilter } from "../../types/types";

const initialFilter: TaskFilter = {
    projectId: "",
    phaseId: "",
    userId: "",
};

export const useTaskTableStates = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState<TaskFilter>(initialFilter);

    // --- Task operations ---
    const initTasks = (tasks: Task[]) => setTasks(tasks);
    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
    const addTasks = (tasks: Task[]) => setTasks((prev) => [...prev, ...tasks]);
    const replaceTask = (task: Task) =>
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    const removeTask = (id: number) =>
        setTasks((prev) => prev.filter((t) => t.id !== id));

    // --- Filter Open ---
    const openFilter = () => setFilterOpen(true);
    const closeFilter = () => setFilterOpen(false);
    const toggleFilter = () => setFilterOpen((prev) => !prev);

    // --- Filter ---
    const changeFilter = (key: keyof TaskFilter, value: string) =>
        setFilter((prev) => ({ ...prev, [key]: value, }));
    const resetFilter = () => setFilter(initialFilter);

    // --- Filtered tasks ---
    const filteredTasks = useMemo(() => {
        return tasks.filter(t => {
            if (filter.projectId && toString(t.project_id) !== filter.projectId) return false;
            if (filter.phaseId && toString(t.phase_id) !== filter.phaseId) return false;
            if (filter.userId && toString(t.user_id) !== filter.userId) return false;
            return true;
        });
    }, [tasks, filter]);

    return {
        tasks, filter, filterOpen, filteredTasks,
        initTasks, addTask, addTasks, replaceTask, removeTask,
        openFilter, closeFilter, toggleFilter,
        resetFilter, changeFilter,
    }
}