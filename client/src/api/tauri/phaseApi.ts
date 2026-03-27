import { invoke } from "@tauri-apps/api/core";
import { PhasePayload, PhaseRow } from "../../types/db/phase";

export const phaseApi = {
    list: async (projectId: string): Promise<PhaseRow[]> => {
        return await invoke("list_phases", { projectId });
    },

    create: async (phase: PhasePayload) => {
        return await invoke("create_phase", { payload: phase });
    },

    update: async (phase: PhasePayload) => {
        return await invoke("update_phase", { payload: phase });
    },

    delete: async (projectId: string, id: string) => {
        return await invoke("delete_phase", { id, projectId });
    },
};