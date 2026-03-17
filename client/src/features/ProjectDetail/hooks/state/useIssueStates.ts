import { useState } from "react";
import { Issue } from "../../types/issue";

export const useIssueStates = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

    return {
        issues, setIssues,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        editingIssue, setEditingIssue,
    };
};

export type IssueStates = ReturnType<typeof useIssueStates>;
