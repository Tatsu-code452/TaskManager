import React from "react";
import { Button } from "../../../components/Button";
import { TokenProps } from "./types";
import { useTokenHandler } from "./useTokenHandler";

// トークン用コンポーネント
const Token = (props: TokenProps) => {
    const { csrfToken, setCsrfToken } = props;
    const { handleFetchToken, loading } = useTokenHandler({ setCsrfToken });

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
