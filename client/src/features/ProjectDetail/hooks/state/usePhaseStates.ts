import { useState } from "react";
import { PhasePayload, PhaseRow } from "../../../../types/db/phase";

export const usePhaseStates = () => {
    // tab
    const [phases, setPhases] = useState<PhaseRow[]>([]);
    const [loading, setLoading] = useState(false);

    // dialog
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [form, setForm] = useState<PhasePayload | null>(null);

    return {
        phases, setPhases,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        form, setForm,
    };
};

export type PhaseStates = ReturnType<typeof usePhaseStates>;
