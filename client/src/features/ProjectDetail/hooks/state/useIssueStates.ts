import { useState } from "react";
import { IssuePayload, IssueRow } from "../../../../types/db/issue";

export const useIssueStates = () => {
    const [issues, setIssues] = useState<IssueRow[]>([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [form, setForm] = useState<IssuePayload | null>(null);

    return {
        issues, setIssues,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        form, setForm
    };
};

export type IssueStates = ReturnType<typeof useIssueStates>;
