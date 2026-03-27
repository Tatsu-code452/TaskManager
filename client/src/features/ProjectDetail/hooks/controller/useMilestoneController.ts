import { useCallback, useEffect } from "react";
import { milestoneApi } from "../../../../api/tauri/milestoneApi";
import { MilestonePayload, MilestoneRow, toMilestonePayload } from "../../../../types/db/milestone";
import { InitPayload, RequiredKeys } from "../../types/milestone";
import { MilestoneStates } from "../state/useMilestoneStates";

export const useMilestoneController = (projectId: string, states: MilestoneStates) => {
    const {
        setMilestones,
        loading,
        setLoading,
        form,
        setShowModal,
        setMode,
        setForm,
    } = states;

    const load = useCallback(async () => {
        setLoading(true);
        const list = await milestoneApi.list(projectId);
        setMilestones(list);
        setLoading(false);
    }, [projectId, setMilestones]);

    useEffect(() => {
        if (loading) return;
        try {
            setLoading(true);
            load();
        } finally {
            setLoading(false);
        }
    }, [load]);

    const handleChange = (key: keyof MilestonePayload, value: unknown) => {
        if (!form) return;
        setForm({ ...form, [key]: value });
    };

    const validate = (data: MilestonePayload): string[] => {
        const requiredRules: Record<RequiredKeys, string> = {
            title: "タイトルは必須です",
            status: "ステータスは必須です",
            start_date: "開始日は必須です",
            end_date: "終了日は必須です",
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
        | { mode: "new"; milestone: null }
        | { mode: "edit"; milestone: MilestoneRow }
    ) => {
        setMode(modal.mode);

        const payload: MilestonePayload =
            modal.mode === "edit" ?
                toMilestonePayload(modal.milestone) :
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

        await milestoneApi.create(form);
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

        await milestoneApi.update(form);
        setForm(InitPayload(projectId));
        await load();
        closeModal();
    }, [form, load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await milestoneApi.delete(projectId, id);
        await load();
    }, [projectId, load]);

    return {
        load, create, update, remove,
        handleChange, handleShowModal,
    };
};
