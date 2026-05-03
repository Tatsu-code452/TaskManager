import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useSearch = <T extends object>(
    key: string,
    initialValue: T
) => {
    const storage = useLocalStorage(key, initialValue).dispatch;
    const [value, setValue] = useState<T>(storage.state.value);

    // 値が変わったら localStorage に保存
    useEffect(() => {
        storage.setState(value);
    }, [value]);

    const dispatch = useMemo(() => {
        const setField = <
            K extends keyof T
        >(field: K, v: T[K]) => setValue({ ...value, [field]: v });
        const setAll = (v: T) => setValue(v);
        const reset = () => setValue(initialValue);
        const save = () => storage.setState(value);
        const remove = () => {
            storage.remove();
            setValue(initialValue);
        };
        const apply = () => value;

        return {
            state: value,
            setField,
            setAll,
            reset,
            save,
            remove,
            apply,
        };
    }, [value]);

    return { dispatch };
};
