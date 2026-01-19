import React from "react";
import { useLogin } from "../hooks/useLogin";

interface LoginProps {
    username: string;
    password: string;
    loginResult: string | null;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    setCsrfToken: (value: string) => void;
    setLoginResult: (value: string | null) => void;
}

const Login: React.FC<LoginProps> = ({
    username,
    password,
    loginResult,
    setUsername,
    setPassword,
    setCsrfToken,
    setLoginResult,
}) => {
    const { login } = useLogin({
        setCsrfToken,
        setLoginResult,
    });
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-row">
                <label htmlFor="username-input">ユーザー名: </label>
                <input
                    id="username-input"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-label="username"
                />
            </div>
            <div className="form-row">
                <label htmlFor="password-input">パスワード: </label>
                <input
                    id="password-input"
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="password"
                />
            </div>
            <div className="controls">
                <button type="submit" className="button primary">
                    ログイン
                </button>
            </div>

            {loginResult != null && (
                <div style={{ marginTop: 12 }}>
                    <label>ログイン結果</label>
                    <pre
                        aria-live="polite"
                        aria-atomic="true"
                        className="response-pre"
                    >
                        {loginResult}
                    </pre>
                </div>
            )}
        </form>
    );
};

export default React.memo(Login);
