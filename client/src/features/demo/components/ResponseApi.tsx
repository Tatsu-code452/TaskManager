import React from "react";

interface ResponseApiProps {
    apiResult: string;
}

// レスポンス表示コンポーネント
const ResponseApi = (props: ResponseApiProps) => {
    const { apiResult } = props;
    return (
        <div style={{ marginTop: 12 }}>
            <label>API レスポンス</label>
            <pre aria-live="polite" aria-atomic="true" className="response-pre">
                {apiResult}
            </pre>
        </div>
    );
};

export default React.memo(ResponseApi);
