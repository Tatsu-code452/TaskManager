import { Result } from "../utils/result";

export interface TokenProps {
    csrfToken: string;
    setCsrfToken: (value: string) => void;
}

export type TokenResponse = {
    token: string
};

export type TokenResult = Result<TokenResponse>;
