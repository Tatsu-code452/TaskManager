import { useState } from "react";
import { Milestone } from "../../types/milestone";

export const useMilestoneStates = () => {
    // tab
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(false);

    // dialog
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

    return {
        milestones, setMilestones,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        editingMilestone, setEditingMilestone,
    };
};

export type MilestoneStates = ReturnType<typeof useMilestoneStates>;
