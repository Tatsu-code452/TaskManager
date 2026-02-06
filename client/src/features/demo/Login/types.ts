import { Result } from "../utils/result";

export interface LoginProps {
    username: string;
    password: string;
    loginResult: string | null;
    setUsername: (value: string) => void;
    setPassword: (value: string) => void;
    setCsrfToken: (value: string) => void;
    setLoginResult: (value: string | null) => void;
}

export type LoginResponse = string;

export type LoginResult = Result<LoginResponse>;
