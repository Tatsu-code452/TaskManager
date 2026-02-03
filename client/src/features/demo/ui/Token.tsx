import React from "react";
import { Button } from "../../../components/Button";
import { AuthState } from "../hooks/auth/useAuthState";
import { useToken } from "../hooks/useToken";

export interface TokenProps {
    csrfToken: string;
    setCsrfToken: (value: string) => void;
}

export const createTokenProps = (auth: AuthState): TokenProps => ({
    csrfToken: auth.csrfToken,
    setCsrfToken: auth.setCsrfToken,
});

// トークン用コンポーネント
const Token = (props: TokenProps) => {
    const { csrfToken, setCsrfToken } = props;
    const { handleFetchToken, loading } = useToken({ setCsrfToken });

    return (
        <div className="form-row">
            <Button
                variant="secondary"
                onClick={handleFetchToken}
                loading={loading}
            >
                CSRFトークン取得
            </Button>
            <span className="token-box">{csrfToken || "なし"}</span>
        </div>
    );
};

export default React.memo(Token);
