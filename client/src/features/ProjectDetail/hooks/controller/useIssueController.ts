import { useCallback, useEffect } from "react";
import { issueApi } from "../../../../api/tauri/issueApi";
import { TagType } from "../../../../types/db/common";
import { IssuePayload, IssueRow, toIssuePayload } from "../../../../types/db/issue";
import { InitPayload } from "../../types/issue";
import { IssueStates } from "../state/useIssueStates";

export const useIssueController = (projectId: string, states: IssueStates) => {
    const {
        setIssues,
        loading,
        setLoading,
        form,
        setShowModal,
        setMode,
        setForm,
    } = states;

    const load = useCallback(async () => {
        setLoading(true);
        const list = await issueApi.list(projectId);
        setIssues(list);
        setLoading(false);
    }, [projectId, setIssues]);

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

    const handleChange = (key: keyof IssuePayload, value: unknown) => {
        if (!form) return;
        setForm({ ...form, [key]: value });
    };

    const validate = (data: IssuePayload): string[] => {
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
        | { mode: "new"; issue: null }
        | { mode: "edit"; issue: IssueRow }
    ) => {
        setMode(modal.mode);

        const payload: IssuePayload =
            modal.mode === "edit" ?
                toIssuePayload(modal.issue) :
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

        await issueApi.create(form);
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

        await issueApi.update(form);
        setForm(InitPayload(projectId));
        await load();
        closeModal();
    }, [form, load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await issueApi.delete(projectId, id);
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
