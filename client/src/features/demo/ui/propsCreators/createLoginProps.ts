import { AuthState } from "../../hooks/auth/useAuthState"
import { LoginProps } from "../Login";

export const createLoginProps = (auth: AuthState): LoginProps => ({
    username: auth.username,
    password: auth.password,
    loginResult: auth.loginResult,
    setUsername: auth.setUsername,
    setPassword: auth.setPassword,
    setCsrfToken: auth.setCsrfToken,
    setLoginResult: auth.setLoginResult,
});
