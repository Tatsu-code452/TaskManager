import { useEffect, useRef } from "react";
import Task from "../../../../types/task.interface";
import { TaskDetailPanelEvent } from "../../types/types";
import { useTaskService } from "../handler/useTaskService";
import { useTaskEditStates } from "../state/useTaskEditStates";
import { useTaskTableStates } from "../state/useTaskTableStates";

export const useTaskTableController = () => {
    const { tasks, filter, filterOpen, filteredTasks,
        initTasks, addTask, addTasks, replaceTask, removeTask,
        openFilter, closeFilter, toggleFilter,
        resetFilter, changeFilter,
    } = useTaskTableStates();
    const { mode, selectedTask, showCsv,
        setNew, setEdit, setView,
        changeSelectedTask,
        openCsv, closeCsv, toggleCsv,
    } = useTaskEditStates();

    const taskService = useTaskService();

    const isEditing = (id: number) => {
        return mode.type === "edit" && mode.id === id;
    }

    // 初期表示(StrictMode回避)
    const isFetching = useRef(false);
    useEffect(() => {
        if (!isFetching.current) {
            isFetching.current = true;
            taskService.listTasks().then(res => {
                if (res.success && res.type === "list") {
                    initTasks(res.tasks);
                }
            });
        }
    }, []);

    // 登録、更新処理
    const save = async (task: Partial<Task>) => {
        if (mode.type === "new") {
            const res = await taskService.createTask(task);
            if (res.success && res.type === "create") {
                addTask(res.task)
            }
        } else if (mode.type === "edit") {
            const res = await taskService.updateTask(mode.id, task);
            if (res.success && res.type === "update") {
                replaceTask(res.task);
            }
        }
        setView();
    };

    // 削除処理
    const remove = async (id: number) => {
        const res = await taskService.deleteTask(id);
        if (res.success && res.type === "delete") {
            removeTask(id);
            setView();
        }
    };

    const handleSelectTask = (task: Task) => {
        changeSelectedTask({ ...task, __editing: false });
    };

    const handleEditDetail = () => {
        if (!selectedTask) return;
        changeSelectedTask({ ...selectedTask, __editing: true });
    };

    const handleCancelDetailEdit = () => {
        if (!selectedTask) return;
        changeSelectedTask({ ...selectedTask, __editing: false });
    };
    const handleDetailEvent = (event: TaskDetailPanelEvent) => {
        switch (event.type) {
            case "enterEdit":
                changeSelectedTask({ ...selectedTask, __editing: true });
                break;

            case "cancelEdit":
                changeSelectedTask({ ...selectedTask, __editing: false });
                break;

            case "save":
                save(event.patch);
                changeSelectedTask({ ...selectedTask, __editing: false });
                break;
        }
    };
    return {
        tasks, filter, filterOpen, filteredTasks,
        initTasks, addTask, addTasks, replaceTask, removeTask,
        openFilter, closeFilter, toggleFilter,
        resetFilter, changeFilter,

        isEditing, save, remove,

        mode, selectedTask, showCsv,
        setNew, setEdit, setView,
        changeSelectedTask,
        openCsv, closeCsv, toggleCsv,

        handleSelectTask, handleEditDetail, handleCancelDetailEdit, handleDetailEvent,
    }
}