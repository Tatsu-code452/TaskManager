import { toErrorMessage } from "../../../utils/notify";
import { login } from "../../../api/auth";
import { useTokenHandler } from "../Token/useTokenHandler";
import { LoginResult } from "./types";

export const useLoginLogic = ({
    username,
    password,
    setCsrfToken,
}: {
    username: string;
    password: string;
    setCsrfToken: (value: string) => void;
}) => {
    const { onFetchToken } = useTokenHandler({ setCsrfToken });

    const onLogin = async (): Promise<LoginResult> => {
        await onFetchToken();
        try {
            const res = await login(username, password);
            await onFetchToken();
            return { ok: true, kind: "data", data: res } as const
        } catch (err) {
            return { ok: false, kind: "error", error: toErrorMessage(err) } as const;
        }
    };

    return {
        onLogin,
    };
};