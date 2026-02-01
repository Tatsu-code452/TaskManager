import { AuthState } from "../../hooks/auth/useAuthState"
import { TokenProps } from "../Token";

export const createTokenProps = (auth: AuthState): TokenProps => ({
    csrfToken: auth.csrfToken,
    setCsrfToken: auth.setCsrfToken,
    setLoginResult: auth.setLoginResult,
});
