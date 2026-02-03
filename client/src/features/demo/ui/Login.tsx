import React from "react";
import { Button } from "../../../components/Button";
import { FormInput } from "../../../components/FormInput";
import { AuthState } from "../hooks/auth/useAuthState";
import { useLogin } from "../hooks/useLogin";

export interface LoginProps {
    username: string;
    password: string;
    loginResult: string | null;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    setCsrfToken: (value: string) => void;
    setLoginResult: (value: string | null) => void;
}

export const createLoginProps = (auth: AuthState): LoginProps => ({
    username: auth.username,
    password: auth.password,
    loginResult: auth.loginResult,
    setUsername: auth.setUsername,
    setPassword: auth.setPassword,
    setCsrfToken: auth.setCsrfToken,
    setLoginResult: auth.setLoginResult,
});

// ログインコンポーネント
const Login = (props: LoginProps) => {
    const {
        username,
        password,
        loginResult,
        setUsername,
        setPassword,
        setCsrfToken,
        setLoginResult,
    } = props;

    const { handleLogin, loading } = useLogin({
        username,
        password,
        setCsrfToken,
        setLoginResult,
    });

    return (
        <form onSubmit={handleLogin}>
            <div className="form-row">
                <FormInput
                    id="username-input"
                    label="ユーザー名:"
                    value={username}
                    onChange={setUsername}
                />
            </div>
            <div className="form-row">
                <FormInput
                    id="password-input"
                    label="パスワード:"
                    type="password"
                    value={password}
                    onChange={setPassword}
                />
            </div>
            <div className="controls">
                <Button type="submit" variant="primary" loading={loading}>
                    ログイン
                </Button>
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
