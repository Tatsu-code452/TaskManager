import React from "react";
import useScreenTitle from "../hooks/useScreenTitle";
import InputText from "../components/parts/InputText";
import Button from "../components/parts/Button";
import useLogin from "../features/auth/useLogin";

const Login = () => {
    useScreenTitle("ログイン画面");
    const { form, handleInputChange, handleLogin } = useLogin();
    const { username, password } = form;

    return (
        <div className="col-md-4">
            <form onSubmit={handleLogin} autoComplete="on">
                <InputText
                    label="ユーザー名"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    autoComplete="username"
                    required
                />

                <InputText
                    label="パスワード"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                    required
                />

                <Button text="ログイン" callback={handleLogin} />
            </form>
        </div>
    );
};

export default Login;
