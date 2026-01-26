import { success, error } from "../../../utils/notify";
import { login as Auth } from "../../../api/auth";

export const useLogin = ({
    setCsrfToken,
    setLoginResult
}: {
    setCsrfToken: (value: string) => void;
    setLoginResult: (value: string | null) => void;
}) => {
    // CSRFトークン取得
    const fetchCsrfToken = async () => {
        try {
            const res = await fetch(`/api/session`, {
                credentials: "include",
            });
            const data = await res.json();
            if (data.csrfToken) setCsrfToken(data.csrfToken);
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            error(msg);
        }
    };

    // ログイン（uses api/auth）
    const login = async (username: string, password: string) => {
        setLoginResult(null);
        await fetchCsrfToken();
        try {
            const res = await Auth(username, password);
            setLoginResult(JSON.stringify(res, null, 2));
            success("ログイン成功");
            await fetchCsrfToken();
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            error(msg);
            setLoginResult(String(err));
        }
    };
    return {
        login,
        fetchCsrfToken,
    };
};