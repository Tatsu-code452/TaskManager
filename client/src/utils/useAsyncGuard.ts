import { useCallback, useRef } from "react";

export const useAsyncGuard = <TArgs extends unknown[], TResult>(
    fn: (...args: TArgs) => Promise<TResult>
) => {
    const isRunning = useRef(false);

    const run = useCallback(
        async (...args: TArgs): Promise<TResult | undefined> => {
            if (isRunning.current) return;

            try {
                isRunning.current = true;
                return await fn(...args);
            } finally {
                isRunning.current = false;
            }
        },
        [fn]
    );

    return { run, isRunning: isRunning.current };
};