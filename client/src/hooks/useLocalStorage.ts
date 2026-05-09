import { useEffect, useMemo, useState } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
    // 初期値のロード
    const readValue = (): T => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) as T : initialValue;
        } catch (e) {
            console.warn(`useLocalStorage: failed to parse key "${key}"`, e);
            return initialValue;
        }
    };

    const [value, setValue] = useState<T>(readValue);

    // 値が変わったら localStorage に保存
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn(`useLocalStorage: failed to save key "${key}"`, e);
        }
    }, [key, value]);

    // dispatch オブジェクト
    const dispatch = useMemo(() => {
        const set = (v: T) => setValue(v);
        const reset = () => setValue(initialValue);
        const remove = () => {
            localStorage.removeItem(key);
            setValue(initialValue);
        };

        return {
            state: { value },
            setState: set,
            reset,
            remove,
        };
    }, [value]);

    return { dispatch };
};
