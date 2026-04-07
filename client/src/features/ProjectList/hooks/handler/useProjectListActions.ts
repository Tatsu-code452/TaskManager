// src/features/ProjectList/hooks/action/useProjectListActions.ts
import { useCallback, useRef } from "react";
import { projectApi } from "../../../../api/tauri/projectApi";
import { ProjectPayload, ProjectRow, ProjectSearchCondition } from "../../../../types/db/project";

export const useProjectListActions = (
    setProjects: (list: ProjectRow[]) => void,
    setTotalNum: (n: number) => void,
) => {
    const loading = useRef(false);

    const loadProjects = useCallback(async () => {
        if (loading.current) return;
        loading.current = true;

        const list = await projectApi.list();
        setProjects(list);

        loading.current = false;
    }, [setProjects]);

    const searchProjects = useCallback(async (
        condition: ProjectSearchCondition, page: number, limit: number
    ) => {
        if (loading.current) return;
        loading.current = true;

        const result = await projectApi.search(condition, page, limit);
        setProjects(result.items);
        setTotalNum(result.total_num);

        loading.current = false;
    }, [setProjects, setTotalNum]);

    const createProject = useCallback(async (
        payload: ProjectPayload,
        condition: ProjectSearchCondition,
        page: number,
        limit: number
    ) => {
        await projectApi.create(payload);
        await searchProjects(condition, page, limit);
    }, [searchProjects]);

    const updateProject = useCallback(async (
        payload: ProjectPayload,
        condition: ProjectSearchCondition,
        page: number,
        limit: number,
    ) => {
        await projectApi.update(payload);
        await searchProjects(condition, page, limit);
    }, [searchProjects]);


    return {
        loadProjects,
        createProject,
        updateProject,
        searchProjects,
    };
};
