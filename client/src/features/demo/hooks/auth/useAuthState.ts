import { useState } from "react";

// 認証情報用のカスタムフック
export const useAuthState = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [csrfToken, setCsrfToken] = useState("");
    const [loginResult, setLoginResult] = useState<string | null>(null);

    return {
        username,
        setUsername,
        password,
        setPassword,
        csrfToken,
        setCsrfToken,
        loginResult,
        setLoginResult,
    };
};
