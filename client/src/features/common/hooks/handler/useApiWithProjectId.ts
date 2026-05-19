import { useCallback } from "react";

type Api<DbRow extends object, Payload extends object> = {
    list: (projectId: string) => Promise<DbRow[]>,
    create: (payload: Payload) => Promise<void>,
    update: (payload: Payload) => Promise<void>,
    delete: (projectId: string, id: string) => Promise<void>,
};

export const useApiWithProjectId = <
    DbRow extends object,
    Payload extends object
>(
    projectId: string,
    api: Api<DbRow, Payload>
) => {
    const { create, update, delete: remove, list } = api;

    const handleList = useCallback(async () => {
        return await list(projectId);
    }, [projectId]);

    const handleCreate = useCallback(async (payload: Payload) => {
        await create(payload);
    }, []);

    const handleUpdate = useCallback(async (payload: Payload) => {
        await update(payload);
    }, [projectId]);

    const handleDelete = useCallback(async (id: string) => {
        await remove(projectId, id);
    }, [projectId]);

    const handleSubmit = async (mode: string, payload: Payload) => {
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
        handleList,
        handleSubmit
    };
};
