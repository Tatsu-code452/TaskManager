import { request } from "../../../../api";

// HTTPリクエスト用カスタムフック
export const useApi = () => {
    /**
     * URLを生成
     * @param entity エンティティ名
     * @param id オプションID
     */
    const buildUrl = (entity: string, id?: number): string =>
        id != null ? `/${entity}/${id}` : `/${entity}`;

    /**
     * 汎用APIリクエスト
     * @param entity エンティティ名
     * @param method HTTPメソッド
     * @param options id, payload
     */
    function apiRequest<T>(
        entity: string,
        method: "GET" | "POST" | "PUT" | "DELETE",
        options?: { id?: number; payload?: unknown }
    ) {
        const url = buildUrl(entity, options?.id);
        const reqOptions: { method: string; body?: unknown } = { method };

        if (options?.payload !== undefined) {
            reqOptions.body = { data: options.payload };
        }

        return request<T>(url, reqOptions);
    }

    // CRUD API
    return {
        get: <T>(entity: string, id?: number) =>
            apiRequest<T>(entity, "GET", { id }),
        post: <T>(entity: string, payload: T) =>
            apiRequest(entity, "POST", { payload }),

        put: <T>(entity: string, id: number, payload: T) =>
            apiRequest(entity, "PUT", { id, payload }),

        del: (entity: string, id: number) =>
            apiRequest(entity, "DELETE", { id }),
    };
};
