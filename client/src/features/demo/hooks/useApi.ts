import { request } from "../../../api";

export const useApi = () => {

    // URLビルダー
    const buildUrl = (entity: string, id?: number) =>
        id != null ? `/${entity}/${id}` : `/${entity}`;

    // 汎用APIリクエスト
    const apiRequest = <T>(
        entity: string,
        method: string,
        options?: { id?: number; payload?: unknown }
    ) => {
        const url = buildUrl(entity, options?.id);

        return request<T>(url, {
            method,
            ...(options?.payload && { body: { data: options.payload } }),
        });
    };

    // CRUD API
    return {
        requestGet: (entity: string) => apiRequest<{ data: any[] }>(entity, "GET"),
        requestPost: (entity: string, payload: unknown) =>
            apiRequest(entity, "POST", { payload }),
        requestPut: (entity: string, id: number, payload: unknown) =>
            apiRequest(entity, "PUT", { id, payload }),
        requestDelete: (entity: string, id: number) =>
            apiRequest(entity, "DELETE", { id })
    };
};