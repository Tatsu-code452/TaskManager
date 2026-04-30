import { useCallback, useEffect } from "react";
import { defectApi } from "../../../../api/tauri/defectApi";
import { TagType } from "../../../../types/db/common";
import { DefectPayload, DefectRow, toDefectPayload } from "../../../../types/db/defect";
import { InitPayload } from "../../types/defect";
import { DefectStates } from "../state/useDefectStates";

export const useDefectController = (projectId: string, states: DefectStates) => {
    const {
        setDefects,
        loading,
        setLoading,
        form,
        setShowModal,
        setMode,
        setForm,
    } = states;

    const load = useCallback(async () => {
        setLoading(true);
        const list = await defectApi.list(projectId);
        setDefects(list);
        setLoading(false);
    }, [projectId, setDefects]);

    useEffect(() => {
        if (loading) return;
        try {
            setLoading(true);
            load();
        } finally {
            setLoading(false);
        }
    }, [load]);

    type RequiredKeys =
        | "title"
        | "description"
        | "status"
        ;

    const handleChange = (key: keyof DefectPayload, value: unknown) => {
        if (!form) return;
        setForm({ ...form, [key]: value });
    };

    const validate = (data: DefectPayload): string[] => {
        const requiredRules: Record<RequiredKeys, string> = {
            title: "タイトルは必須です",
            description: "内容は必須です",
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
        | { mode: "new"; defect: null }
        | { mode: "edit"; defect: DefectRow }
    ) => {
        setMode(modal.mode);

        const payload: DefectPayload =
            modal.mode === "edit" ?
                toDefectPayload(modal.defect) :
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

        await defectApi.create(form);
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

        await defectApi.update(form);
        setForm(InitPayload(projectId));
        await load();
        closeModal();
    }, [form, load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await defectApi.delete(projectId, id);
        await load();
    }, [projectId, load]);

    const addTag = (newTagType: TagType, newTagValue: string) => {
        if (!newTagValue.trim()) return;

        handleChange("tags", [
            ...form.tags,
            { tag_type: newTagType, value: newTagValue },
        ]);
    };

    const removeTag = (index: number) => {
        const newTags = [...form.tags];
        newTags.splice(index, 1);
        handleChange("tags", newTags);
    };

    return {
        load, create, update, remove,
        handleChange, handleShowModal,
        addTag, removeTag
    };
};
