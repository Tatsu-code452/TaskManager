import { useState, useRef } from "react";

// API結果、通信中フラグ用のカスタムフック
export const useApiState = () => {
    const [apiResult, setApiResult] = useState<string | null>(null);
    const isFetching = useRef(false);

    return {
        apiResult,
        setApiResult,
        isFetching,
    };
};
