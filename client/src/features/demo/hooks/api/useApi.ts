import { request } from "../../../../api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
    id?: number;
    payload?: unknown;
}

interface RequestOptions {
    method: HttpMethod;
    body?: unknown;
}

const buildUrl = (entity: string, id?: number): string =>
    id != null ? `/${entity}/${id}` : `/${entity}`;

// HTTPリクエスト用カスタムフック
export const useApi = () => {
    /**
     * 汎用APIリクエスト
     * @param entity エンティティ名
     * @param method HTTPメソッド
     * @param options id, payload
     */
    function apiRequest<T>(
        entity: string,
        method: HttpMethod,
        options?: ApiOptions,
    ) {
        const url = buildUrl(entity, options?.id);
        const reqOptions: RequestOptions = { method };

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
