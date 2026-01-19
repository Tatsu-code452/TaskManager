import React from "react";
import { useLogin } from "../hooks/useLogin";

interface TokenProps {
    csrfToken: string;
    setCsrfToken: (value: string) => void;
    setLoginResult: (value: string | null) => void;
}

const Token: React.FC<TokenProps> = ({ 
    csrfToken,
    setCsrfToken, 
    setLoginResult, 
 }) => {
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
