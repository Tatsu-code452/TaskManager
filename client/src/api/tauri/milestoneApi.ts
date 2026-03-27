import { invoke } from "@tauri-apps/api/core";
import { MilestonePayload, MilestoneRow } from "../../types/db/milestone";

export const milestoneApi = {
    list: async (projectId: string): Promise<MilestoneRow[]> => {
        return await invoke("list_milestones", { projectId });
    },

    create: async (milestone: MilestonePayload) => {
        return await invoke("create_milestone", { payload: milestone });
    },

    update: async (milestone: MilestonePayload) => {
        return await invoke("update_milestone", { payload: milestone });
    },

    delete: async (projectId: string, id: string) => {
        return await invoke("delete_milestone", { id, projectId });
    },
};