import { useState } from "react";
import { ProjectPayload } from "../../../../types/db/project";

export type ModalMode = "new" | "edit" | null;
export const useProjectFormStates = () => {
    const [form, setForm] = useState<ProjectPayload | null>(null);
    const [modalMode, setModalMode] = useState<ModalMode>(null);

    return {
        form, setForm,
        modalMode, setModalMode,
    }
}

export type ProjectFormStates = ReturnType<typeof useProjectFormStates>;