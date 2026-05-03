import { useCallback } from "react";
import { projectApi } from "../../../../api/tauri/projectApi";
import { ProjectPayload, ProjectSearchCondition } from "../../../../types/db/project";

export const useProjectApi = () => {
    const searchProjects = useCallback(async (
        condition: ProjectSearchCondition, page: number, limit: number
    ) => {
        return await projectApi.search(condition, page, limit);
    }, []);

    const createProject = useCallback(async (
        payload: ProjectPayload,
    ) => {
        await projectApi.create(payload);
    }, []);

    const updateProject = useCallback(async (
        payload: ProjectPayload,
    ) => {
        await projectApi.update(payload);
    }, []);

    return {
        createProject,
        updateProject,
        searchProjects,
    };
};
