import React from "react";

interface ResponseApiProps {
    apiResult: string;
}

const ResponseApi: React.FC<ResponseApiProps> = ({ apiResult }) => {
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
