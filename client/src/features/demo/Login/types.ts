import { useLoginHandler } from "./useLoginHandler";

export interface LoginProps {
    username: string;
    password: string;
    loginResult: string | null;
    loading: boolean
    onChangeUsername: (value: string) => void;
    onChangePassword: (value: string) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
}

export type LoginHandler = ReturnType<typeof useLoginHandler>;