import { useState } from "react";
import { Phase } from "../../types/phase";

export const usePhaseStates = () => {
    // tab
    const [phases, setPhases] = useState<Phase[]>([]);
    const [loading, setLoading] = useState(false);

    // dialog
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [editingPhase, setEditingPhase] = useState<Phase | null>(null);

    return {
        phases, setPhases,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        editingPhase, setEditingPhase
    };
};

export type PhaseStates = ReturnType<typeof usePhaseStates>;
