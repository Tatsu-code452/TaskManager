import { useState } from "react";
import { ProjectPayload } from "../../../../api/tauri/projectApi";

export type ModalMode = "create" | "edit" | null;
export const useProjectFormStates = () => {
    const [form, setForm] = useState<ProjectPayload | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);

    return {
        form, setForm,
        modalMode, setModalMode,
    }
}

export type ProjectFormStates = ReturnType<typeof useProjectFormStates>;