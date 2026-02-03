import { success, error, toErrorMessage } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { login as Auth } from "../../../api/auth";
import { useToken } from "./useToken";

export type Result<T> =
    | { ok: true; data: T }
    | { ok: false; error: string };

export type LoginResult = Result<unknown>;

export const useLogin = ({
    username,
    password,
    setCsrfToken,
    setLoginResult
}: {
    username: string;
    password: string;
    setCsrfToken: (value: string) => void;
    setLoginResult: (value: string | null) => void;
}) => {
    const { onFetchToken } = useToken({ setCsrfToken });

    // ログイン（uses api/auth）
    const onLogin = async (): Promise<LoginResult> => {
        await onFetchToken();
        try {
            const res = await Auth(username, password);
            await onFetchToken();
            return { ok: true, data: res } as const
        } catch (err) {
            return { ok: false, error: toErrorMessage(err) } as const;
        }
    };

    const { execute, loading } = useAsync<LoginResult>(onLogin);

    const handleLogin = async (e: React.FormEvent) => {
        // form送信抑止
        e.preventDefault();
        setLoginResult(null);
        const res = await execute();
        if (res.ok === false) {
            setLoginResult(res.error);
            error(res.error);
        } else {
            setLoginResult(JSON.stringify(res.data, null, 2));
            success("ログイン成功");
        }
    };

    return {
        onLogin,
        handleLogin,
        loading,
    };
};