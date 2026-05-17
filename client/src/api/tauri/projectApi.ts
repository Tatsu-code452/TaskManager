import { invoke } from "@tauri-apps/api/core";
import { ProjectPayload, ProjectRow, ProjectSearchCondition, ProjectSearchResult } from "../../types/db/project";

export const projectApi = () => {
    const list = async (condition?: ProjectSearchCondition): Promise<ProjectRow[]> => {
        if (condition) {
            return await invoke<ProjectRow[]>("search_projects", { condition });
        }
        return await invoke<ProjectRow[]>("list_projects", {});
    };

    const create = async (payload: ProjectPayload) => {
        const response = await invoke("create_project", { payload });
        return response;
    }

    const update = async (payload: ProjectPayload) => {
        const response = await invoke("update_project", { payload });
        return response;
    }

    const remove = async (id: string) => {
        return await invoke("delete_project", { id });
    }

    const search = async (
        condition: ProjectSearchCondition = {},
        page: number = 1,
        limit: number = 20
    ): Promise<ProjectSearchResult> => {
        return await invoke<ProjectSearchResult>(
            "search_projects",
            { condition: { ...condition, page, limit } });
    }

    return { list, create, update, remove, search }
}