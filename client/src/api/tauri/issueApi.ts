import { invoke } from "@tauri-apps/api/core";
import { IssueKey, IssueRow, IssueValue } from "../../types/db/issue";

export type IssuePayload = Partial<IssueValue> & IssueKey;

export const issueApi = {
    list: async (projectId: string): Promise<IssueRow[]> => {
        return await invoke("list_issues", { projectId });
    },

    create: async (issue: IssuePayload) => {
        return await invoke("create_issue", { payload: issue });
    },

    update: async (issue: IssuePayload) => {
        return await invoke("update_issue", { payload: issue });
    },

    delete: async (projectId: string, id: string) => {
        return await invoke("delete_issue", { id, projectId });
    },
};