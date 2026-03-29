import { useCallback, useEffect } from "react";
import { taskApi } from "../../../../api/tauri/taskApi";
import { TaskPayload, TaskRow, toTaskPayload } from "../../../../types/db/task";
import { InitPayload, RequiredKeys } from "../../types/task";
import { TaskStates } from "../state/useTaskStates";

export const useTaskController = (projectId: string, states: TaskStates) => {
    const {
        setTasks,
        loading,
        setLoading,
        form,
        setShowModal,
        setMode,
        setForm,
    } = states;

    const load = useCallback(async () => {
        setLoading(true);
        const list = await taskApi.list(projectId);
        setTasks(list);
        setLoading(false);
    }, [projectId, setTasks]);

    useEffect(() => {
        if (loading) return;
        try {
            setLoading(true);
            load();
        } finally {
            setLoading(false);
        }
    }, [load]);

    const handleChange = (key: keyof TaskPayload, value: unknown) => {
        if (!form) return;
        setForm({ ...form, [key]: value });
    };

    const validate = (data: TaskPayload): string[] => {
        const requiredRules: Record<RequiredKeys, string> = {
            name: "タスク名は必須です",
        };
        const errors: string[] = [];

        // 必須チェック（型安全にループ）
        (Object.keys(requiredRules) as RequiredKeys[]).forEach((key) => {
            const value = data[key];
            if (!value || value.toString().trim() === "") {
                errors.push(requiredRules[key]);
            }
        });

        return errors;
    };

    // -----------------------------
    // モーダル制御
    // -----------------------------
    const closeModal = () => {
        setMode(null);
        setForm(InitPayload(projectId));
        setShowModal(false);
    };

    const handleShowModal = (modal:
        | { mode: "new"; task: null }
        | { mode: "edit"; task: TaskRow }
    ) => {
        setMode(modal.mode);

        const payload: TaskPayload =
            modal.mode === "edit" ?
                toTaskPayload(modal.task) :
                InitPayload(projectId);

        setForm(payload);
        setShowModal(true);
    };

    const create = useCallback(async () => {
        const errors = validate(form);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await taskApi.create(form);
        await load();
        setForm(InitPayload(projectId));
        closeModal();
    }, [form, load]);

    const update = useCallback(async () => {
        const errors = validate(form);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await taskApi.update(form);
        setForm(InitPayload(projectId));
        await load();
        closeModal();
    }, [form, load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await taskApi.delete(projectId, id);
        await load();
    }, [projectId, load]);

    return {
        load, create, update, remove,
        handleChange, handleShowModal,
    };
};
