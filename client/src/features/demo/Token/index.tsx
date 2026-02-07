import React from "react";
import { Button } from "../../../components/Button";
import { TokenProps } from "./types";

// トークン用コンポーネント
const Token = (props: TokenProps) => {
    const { csrfToken, loading, getCsrfToken } = props;

    return (
        <div className="form-row">
            <Button
                variant="secondary"
                onClick={getCsrfToken}
                loading={loading}
            >
                CSRFトークン取得
            </Button>
            <span className="token-box">{csrfToken || "なし"}</span>
        </div>
    );
};

export default React.memo(Token);
