import { login } from "../../../api/auth";
import { toErrorMessage } from "../../../utils/notify";
import { Result } from "../utils/result";

export const useLoginLogic = ({
    username,
    password,
    onFetchToken,
}: {
    username: string;
    password: string;
    onFetchToken: () => void;
}) => {
    const onLogin = async (): Promise<Result<string>> => {
        try {
            await onFetchToken();
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