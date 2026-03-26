import { useState } from "react";
import { DefectPayload, DefectRow } from "../../../../types/db/defect";

export const useDefectStates = () => {
    const [defects, setDefects] = useState<DefectRow[]>([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [form, setForm] = useState<DefectPayload | null>(null);

    return {
        defects, setDefects,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        form, setForm,
    };
};

export type DefectStates = ReturnType<typeof useDefectStates>;
