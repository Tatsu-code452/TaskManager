import { useState, useCallback } from "react";

export const useAsync = <A extends unknown[], T>(
    asyncFn: (...args: A) => Promise<T>
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const execute = useCallback(
        async (...args: A): Promise<T> => {
            if (loading) throw new Error("Already loading");

            setLoading(true);
            setError(null);

            try {
                const result = await asyncFn(...args);
                setData(result);
                return result;
            } catch (err) {
                setError(err?.message ?? "Unknown error");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [asyncFn, loading]
    );

    return { execute, loading, error, data };
};