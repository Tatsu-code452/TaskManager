import { Result } from "../utils/result";
import { useTokenHandler } from "./useTokenHandler";

export interface TokenProps {
    csrfToken: string;
    loading: boolean;
    getCsrfToken: () => void;
}

export type TokenHandler = ReturnType<typeof useTokenHandler>;

export type TokenResponse = {
    token: string
};

export type TokenResult = Result<TokenResponse>;
