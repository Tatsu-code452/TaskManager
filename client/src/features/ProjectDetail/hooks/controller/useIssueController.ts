import { useCallback, useEffect } from "react";
import { issueApi } from "../../../../api/tauri/issueApi";
import { IssuePriority, IssueStatus } from "../../../../types/db/issue";
import { Issue, toIssue, toIssuePayload } from "../../types/issue";
import { IssueStates } from "../state/useIssueStates";

export const useIssueController = (projectId: string, states: IssueStates) => {
    const {
        setIssues,
        loading,
        setLoading,
        editingIssue,
        setShowModal,
        setMode,
        setEditingIssue,
    } = states;

    const validate = (data: Issue): string[] => {
        const errors: string[] = [];

        if (!data.title || data.title.trim() === "") {
            errors.push("タイトルは必須です");
        }

        return errors;
    };

    const load = useCallback(async () => {
        const list = await issueApi.list(projectId);
        setIssues(list.map(toIssue));
        setLoading(false);
    }, [projectId]);

    const create = useCallback(async () => {
        const errors = validate(editingIssue);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await issueApi.create(toIssuePayload(editingIssue));
        await load();
    }, [load]);

    const update = useCallback(async () => {
        const errors = validate(editingIssue);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await issueApi.update(toIssuePayload(editingIssue));
        await load();
    }, [load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await issueApi.delete(projectId, id);
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

    const handleChange = (key: keyof Issue, value: string | number) => {
        if (!editingIssue) return;
        setEditingIssue({ ...editingIssue, [key]: value });
    };

    const handleShowModal = (mode: "new" | "edit", issue: Issue | null) => {
        setMode(mode);

        if (mode === "new") {
            issue = {
                id: "",
                projectId,
                taskId: null,
                title: "",
                description: "",
                status: IssueStatus.Open,
                priority: IssuePriority.Low,
                owner: "",
            };
        }

        setEditingIssue(issue);
        setShowModal(true);
    };

    return {
        load, create, update, remove,
        handleChange, handleShowModal,
    };
};
