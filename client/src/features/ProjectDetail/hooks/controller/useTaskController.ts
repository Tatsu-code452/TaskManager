import { useCallback, useEffect } from "react";
import { taskApi } from "../../../../api/tauri/taskApi";
import { TaskStatus } from "../../../../types/db/task";
import { Task, toTask, toTaskPayload } from "../../types/task";
import { TaskStates } from "../state/useTaskStates";

export const useTaskController = (projectId: string, states: TaskStates) => {
    const {
        setTasks,
        loading,
        setLoading,
        editingTask,
        setShowModal,
        setMode,
        setEditingTask,
    } = states;


    const validate = (data: Task): string[] => {
        const errors: string[] = [];

        if (!data.name || data.name.trim() === "") {
            errors.push("名称は必須です");
        }

        return errors;
    };

    const load = useCallback(async () => {
        const list = await taskApi.list(projectId);
        setTasks(list.map(toTask));
        setLoading(false);
    }, [projectId]);

    const create = useCallback(async () => {
        const errors = validate(editingTask);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await taskApi.create(toTaskPayload(editingTask));
        await load();
    }, [load]);

    const update = useCallback(async () => {
        const errors = validate(editingTask);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
        await taskApi.update(toTaskPayload(editingTask));
        await load();
    }, [load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await taskApi.delete(projectId, id);
        await load();
    }, [projectId, load]);

    // strict mode回避
    useEffect(() => {
        if (loading) return;
        try {
            setLoading(true);
            load();
        } finally {
            setLoading(false);
        }
    }, [load]);

    const handleChange = (key: keyof Task, value: string | number) => {
        if (!editingTask) return;
        setEditingTask({ ...editingTask, [key]: value })
    }

    const handleShowModal = (mode: "new" | "edit", task: Task) => {
        setMode(mode);
        if (mode === "new") {
            task = {
                id: "",
                projectId: "",
                phaseId: "",
                name: "",
                plannedStart: "",
                plannedEnd: "",
                actualStart: "",
                actualEnd: "",
                plannedHours: 0.0,
                actualHours: 0.0,
                progressRate: 0.0,
                status: TaskStatus.NotStarted,
            }
        }
        setEditingTask(task);
        setShowModal(true);
    }

    return {
        load, create, update, remove,
        handleChange, handleShowModal
    };
};