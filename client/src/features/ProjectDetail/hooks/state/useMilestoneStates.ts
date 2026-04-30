import { useState } from "react";
import { MilestonePayload, MilestoneRow } from "../../../../types/db/milestone";

export const useMilestoneStates = () => {
    // tab
    const [milestones, setMilestones] = useState<MilestoneRow[]>([]);
    const [loading, setLoading] = useState(false);

    // dialog
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [form, setForm] = useState<MilestonePayload | null>(null);

    return {
        milestones, setMilestones,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        form, setForm,
    };
};

export type MilestoneStates = ReturnType<typeof useMilestoneStates>;
