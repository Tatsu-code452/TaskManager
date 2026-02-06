import { toErrorMessage } from "../../../utils/notify";
import { TokenResult } from "./types";

export const useTokenLogic = () => {
    const path = "/api/session";

    // 実処理
    const onFetchToken = async (): Promise<TokenResult> => {
        try {
            const res = await fetch(path, {
                credentials: "include",
            });
            const data = await res.json();

            if (data.csrfToken) {
                return { ok: true, kind: "data", data: { token: data.csrfToken } } as const;
            }

            return { ok: false, kind: "error", error: "CSRF token not found" } as const;
        } catch (err) {
            return { ok: false, kind: "error", error: toErrorMessage(err) } as const;
        }
    };

    return {
        onFetchToken,
    };
};