import { AuthState } from "../hooks/auth/useAuthState";
import { TokenHandler, TokenProps } from "./types";

export const createTokenProps = (auth: AuthState, tokenHandler: TokenHandler): TokenProps => ({
    csrfToken: auth.csrfToken,
    loading: tokenHandler.loading,
    getCsrfToken: tokenHandler.onFetchToken,
});