import { invoke } from "@tauri-apps/api/core";
import { DefectPayload, DefectRow } from "../../types/db/defect";

export const defectApi = {
    list: async (projectId: string): Promise<DefectRow[]> => {
        return await invoke("list_defects", { projectId });
    },

    create: async (defect: DefectPayload) => {
        await invoke("create_defect", { payload: defect });
    },

    update: async (defect: DefectPayload) => {
        await invoke("update_defect", { payload: defect });
    },

    delete: async (projectId: string, id: string) => {
        await invoke("delete_defect", { id, projectId });
    },
};