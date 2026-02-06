import { useState } from "react";

// API結果、通信中フラグ用のカスタムフック
export const useApiState = () => {
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const reset = () => {
        setData(null);
        setError(null);
        setIsLoading(false);
    };

    // TODO 以下は変更予定
    const [apiResult, setApiResult] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    return {
        apiResult,
        setApiResult,
        isFetching,
        setIsFetching,
        data,
        setData,
        error,
        setError,
        isLoading,
        setIsLoading,
        reset,
    };
};

export type ApiState = ReturnType<typeof useApiState>;