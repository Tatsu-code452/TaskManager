import { projectApi } from "@api/projectApi";
import { ProjectPayload } from "@comtypes/db/project";
import { SearchCondition } from "@features/ProjectList/types/types";
import { useCallback } from "react";

export const useProjectApi = () => {
    const { create, update, remove, search } = projectApi();

    const handleSearch = useCallback(async (
        condition: SearchCondition, page: number, limit: number
    ) => {
        return await search(condition, page, limit);
    }, []);

    const handleCreate = useCallback(async (
        payload: ProjectPayload,
    ) => {
        await create(payload);
    }, []);

    const handleUpdate = useCallback(async (
        payload: ProjectPayload,
    ) => {
        await update(payload);
    }, []);

    const handleDelete = useCallback(async (
        id: string,
    ) => {
        await remove(id);
    }, []);

    const handleSubmit = async (mode: string, payload: ProjectPayload) => {
        if (mode === "new") {
            await handleCreate(payload);
        } else if (mode === "edit") {
            await handleUpdate(payload);
        }
    }

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        handleSearch,
        handleSubmit
    };
};
