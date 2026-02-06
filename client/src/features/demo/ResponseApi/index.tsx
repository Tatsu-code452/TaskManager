import React from "react";
import { ResponseApiProps } from "./types";

// レスポンス表示コンポーネント
const ResponseApi = (props: ResponseApiProps) => {
    const { apiResult } = props;
    return (
        <div style={{ marginTop: 12 }}>
            <p>API レスポンス</p>
            <pre aria-live="polite" aria-atomic="true" className="response-pre">
                {apiResult}
            </pre>
        </div>
    );
};

export default React.memo(ResponseApi);
