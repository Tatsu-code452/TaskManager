import { success, error } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { useLoginLogic } from "./useLoginLogic";

export const useLoginHandler = ({
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
    const { onLogin } = useLoginLogic({
        username,
        password,
        setCsrfToken,
    });
    const { execute, loading } = useAsync(onLogin);

    const handleLogin = async (e: React.FormEvent) => {
        // form送信抑止
        e.preventDefault();
        setLoginResult(null);
        const res = await execute();
        if (res.ok === false) {
            setLoginResult(res.error);
            error(res.error);
            return;
        }
        switch (res.kind) {
            case "data":
                setLoginResult(JSON.stringify(res.data, null, 2));
                success("ログイン成功");
                break;
            case "empty":
                break;
        }

    };

    return {
        handleLogin,
        loading,
    };
};