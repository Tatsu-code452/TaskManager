import { useState, useCallback } from "react";

export const useAsync = <T,>(asyncFn: () => Promise<T>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const execute = useCallback(async (): Promise<T> => {
        if (loading) throw new Error("Already loading"); // 二重送信防止

        setLoading(true);
        setError(null);

        try {
            const result = await asyncFn();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err?.message ?? "Unknown error");
            throw err;
        } finally {
            setLoading(false);
        }
    }, [asyncFn, loading]);

    return { execute, loading, error, data };
};