import { useCallback, useEffect } from "react";
import { phaseApi } from "../../../../api/tauri/phaseApi";
import { Phase, toPhase, toPhasePayload } from "../../types/phase";
import { PhaseStates } from "../state/usePhaseStates";

export const usePhaseController = (projectId: string, states: PhaseStates) => {
    const {
        setPhases,
        loading,
        setLoading,
        editingPhase,
        setShowModal,
        setMode,
        setEditingPhase,
    } = states;


    const validate = (data: Phase): string[] => {
        const errors: string[] = [];

        if (!data.name || data.name.trim() === "") {
            errors.push("名称は必須です");
        }

        return errors;
    };

    const load = useCallback(async () => {
        const list = await phaseApi.list(projectId);
        setPhases(list.map(toPhase));
        setLoading(false);
    }, [projectId]);

    const create = useCallback(async () => {
        const errors = validate(editingPhase);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await phaseApi.create(toPhasePayload(editingPhase));
        await load();
    }, [load]);

    const update = useCallback(async () => {
        const errors = validate(editingPhase);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
        await phaseApi.update(toPhasePayload(editingPhase));
        await load();
    }, [load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await phaseApi.delete(projectId, id);
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

    const handleChange = (key: keyof Phase, value: string | number) => {
        if (!editingPhase) return;
        setEditingPhase({ ...editingPhase, [key]: value })
    }

    const handleShowModal = (mode: "new" | "edit", phase: Phase) => {
        setMode(mode);
        if (mode === "new") {
            phase = {
                id: "",
                projectId,
                name: "",
                order: 0,
                inputs: [],
                outputs: [],
            }
        }
        setEditingPhase(phase);
        setShowModal(true);
    }

    return {
        load, create, update, remove,
        handleChange, handleShowModal
    };
};