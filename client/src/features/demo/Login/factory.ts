import { AuthState } from "../hooks/auth/useAuthState";
import { LoginHandler, LoginProps } from "./types";

export const createLoginProps = (auth: AuthState, loginHandler: LoginHandler): LoginProps => ({
    username: auth.username,
    password: auth.password,
    loginResult: auth.loginResult,
    loading: loginHandler.loading,
    onChangeUsername: auth.setUsername,
    onChangePassword: auth.setPassword,
    onSubmit: loginHandler.handleLogin,
});