import { error, toErrorMessage } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";

export type TokenResult =
    | { ok: true; token: string }
    | { ok: false; error: string };

export const useToken = ({
    setCsrfToken,
}: {
    setCsrfToken: (value: string) => void;
}) => {
    const path = "/api/session";

    // 実処理
    const onFetchToken = async (): Promise<TokenResult> => {
        try {
            const res = await fetch(path, {
                credentials: "include",
            });
            const data = await res.json();

            if (data.csrfToken) {
                return { ok: true, token: data.csrfToken } as const;
            }

            return { ok: false, error: "CSRF token not found" } as const;
        } catch (err) {
            return { ok: false, error: toErrorMessage(err) } as const;
        }
    };

    const { execute, loading } = useAsync<TokenResult>(onFetchToken);

    // UIのonClickに設定
    const handleFetchToken = async () => {
        const res = await execute();

        if (res.ok === false) {
            error(res.error);
        } else {
            setCsrfToken(res.token);
        }
    };

    return {
        onFetchToken,
        handleFetchToken,
        loading,
    };
};