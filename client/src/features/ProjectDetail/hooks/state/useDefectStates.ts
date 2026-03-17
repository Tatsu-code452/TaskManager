import { useState } from "react";
import { Defect } from "../../types/defect";

export const useDefectStates = () => {
    const [defects, setDefects] = useState<Defect[]>([]);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState<"new" | "edit">("new");
    const [editingDefect, setEditingDefect] = useState<Defect | null>(null);

    return {
        defects, setDefects,
        loading, setLoading,
        showModal, setShowModal,
        mode, setMode,
        editingDefect, setEditingDefect,
    };
};

export type DefectStates = ReturnType<typeof useDefectStates>;
