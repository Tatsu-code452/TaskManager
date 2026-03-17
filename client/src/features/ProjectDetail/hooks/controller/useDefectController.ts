import { useCallback, useEffect } from "react";
import { defectApi } from "../../../../api/tauri/defectApi";
import { DefectSeverity, DefectStatus } from "../../../../types/db/defect";
import { Defect, toDefect, toDefectPayload } from "../../types/defect";
import { DefectStates } from "../state/useDefectStates";

export const useDefectController = (projectId: string, states: DefectStates) => {
    const {
        setDefects,
        loading,
        setLoading,
        editingDefect,
        setShowModal,
        setMode,
        setEditingDefect,
    } = states;

    const validate = (data: Defect): string[] => {
        const errors: string[] = [];

        if (!data.title || data.title.trim() === "") {
            errors.push("タイトルは必須です");
        }

        return errors;
    };

    const load = useCallback(async () => {
        const list = await defectApi.list(projectId);
        setDefects(list.map(toDefect));
        setLoading(false);
    }, [projectId]);

    const create = useCallback(async () => {
        const errors = validate(editingDefect);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await defectApi.create(toDefectPayload(editingDefect));
        await load();
    }, [load]);

    const update = useCallback(async () => {
        const errors = validate(editingDefect);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await defectApi.update(toDefectPayload(editingDefect));
        await load();
    }, [load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await defectApi.delete(projectId, id);
        await load();
    }, [projectId, load]);

    useEffect(() => {
        if (loading) return;
        try {
            setLoading(true);
            load();
        } finally {
            setLoading(false);
        }
    }, [load]);

    const handleChange = (key: keyof Defect, value: string | number) => {
        if (!editingDefect) return;
        setEditingDefect({ ...editingDefect, [key]: value });
    };

    const handleShowModal = (mode: "new" | "edit", defect: Defect | null) => {
        setMode(mode);

        if (mode === "new") {
            defect = {
                id: "",
                projectId,
                taskId: null,
                title: "",
                description: "",
                severity: DefectSeverity.Minor,
                status: DefectStatus.Open,
            };
        }

        setEditingDefect(defect);
        setShowModal(true);
    };

    return {
        load, create, update, remove,
        handleChange, handleShowModal,
    };
};
