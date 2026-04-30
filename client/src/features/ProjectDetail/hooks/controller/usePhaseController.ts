import { useCallback, useEffect } from "react";
import { phaseApi } from "../../../../api/tauri/phaseApi";
import { PhasePayload, PhaseRow, toPhasePayload } from "../../../../types/db/phase";
import { InitPayload, RequiredKeys } from "../../types/phase";
import { PhaseStates } from "../state/usePhaseStates";

export const usePhaseController = (projectId: string, states: PhaseStates) => {
    const {
        setPhases,
        loading,
        setLoading,
        form,
        setShowModal,
        setMode,
        setForm,
    } = states;

    const load = useCallback(async () => {
        setLoading(true);
        const list = await phaseApi.list(projectId);
        setPhases(list);
        setLoading(false);
    }, [projectId, setPhases]);

    useEffect(() => {
        if (loading) return;
        try {
            setLoading(true);
            load();
        } finally {
            setLoading(false);
        }
    }, [load]);

    const handleChange = (key: keyof PhasePayload, value: unknown) => {
        if (!form) return;
        setForm({ ...form, [key]: value });
    };

    const validate = (data: PhasePayload): string[] => {
        const requiredRules: Record<RequiredKeys, string> = {
            name: "名称は必須です",
            order: "Noは必須です",
            status: "ステータスは必須です",
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
        | { mode: "new"; phase: null }
        | { mode: "edit"; phase: PhaseRow }
    ) => {
        setMode(modal.mode);

        const payload: PhasePayload =
            modal.mode === "edit" ?
                toPhasePayload(modal.phase) :
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

        await phaseApi.create(form);
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

        await phaseApi.update(form);
        setForm(InitPayload(projectId));
        await load();
        closeModal();
    }, [form, load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await phaseApi.delete(projectId, id);
        await load();
    }, [projectId, load]);

    return {
        load, create, update, remove,
        handleChange, handleShowModal,
    };
};
