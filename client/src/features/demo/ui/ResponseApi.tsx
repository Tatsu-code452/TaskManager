import React from "react";
import { ApiState } from "../hooks/api/useApiState";

interface ResponseApiProps {
    apiResult: string;
}

export const createApiResultProps = (api: ApiState) => ({
    apiResult: api.apiResult,
});

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
