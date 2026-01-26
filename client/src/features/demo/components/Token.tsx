import React from "react";
import { useLogin } from "../hooks/useLogin";

export interface TokenProps {
    csrfToken: string;
    setCsrfToken: (value: string) => void;
    setLoginResult: (value: string | null) => void;
}

// トークン用コンポーネント
const Token = (props: TokenProps) => {
    const { csrfToken, setCsrfToken, setLoginResult } = props;

    const { fetchCsrfToken } = useLogin({
        setCsrfToken,
        setLoginResult,
    });
    return (
        <div className="form-row">
            <button
                type="button"
                className="button secondary"
                onClick={fetchCsrfToken}
            >
                CSRFトークン取得
            </button>
            <span className="token-box">{csrfToken || "なし"}</span>
        </div>
    );
};

export default React.memo(Token);
