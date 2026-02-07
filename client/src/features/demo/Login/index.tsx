import React from "react";
import { Button } from "../../../components/Button";
import { FormInput } from "../../../components/FormInput";
import { LoginProps } from "./types";

// ログインコンポーネント
const Login = (props: LoginProps) => {
    const {
        username,
        password,
        loginResult,
        loading,
        onChangeUsername,
        onChangePassword,
        onSubmit,
    } = props;

    return (
        <form onSubmit={onSubmit}>
            <div className="form-row">
                <FormInput
                    id="username-input"
                    label="ユーザー名:"
                    value={username}
                    onChange={onChangeUsername}
                />
            </div>
            <div className="form-row">
                <FormInput
                    id="password-input"
                    label="パスワード:"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
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
