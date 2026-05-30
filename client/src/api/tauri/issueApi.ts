import { invoke } from "@tauri-apps/api/core";
import { IssuePayload, IssueRow } from "../../types/db/issue";

export const issueApi = {
    list: async (projectId: string): Promise<IssueRow[]> => {
        return await invoke("list_issues", { projectId });
    },

    create: async (issue: IssuePayload) => {
        await invoke("create_issue", { payload: issue });
    },

    update: async (issue: IssuePayload) => {
        await invoke("update_issue", { payload: issue });
    },

    delete: async (projectId: string, id: string) => {
        await invoke("delete_issue", { id, projectId });
    },
};