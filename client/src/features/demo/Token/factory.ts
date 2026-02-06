import { AuthState } from "../hooks/auth/useAuthState";
import { TokenProps } from "./types";

export const createTokenProps = (auth: AuthState): TokenProps => ({
    csrfToken: auth.csrfToken,
    setCsrfToken: auth.setCsrfToken,
});