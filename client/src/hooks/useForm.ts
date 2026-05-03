import { useMemo, useState } from "react";

export const useForm = <T extends object>(initialValue: T) => {
    const [value, setValue] = useState<T>(initialValue);
    const [isDirty, setDirty] = useState(false);

    const dispatch = useMemo(() => {
        const setField = <K extends keyof T>(key: K, v: T[K]) => {
            setValue({ ...value, [key]: v });
            setDirty(true);
        };

        const setAll = (v: T) => {
            setValue(v);
            setDirty(true);
        };

        const reset = () => {
            setValue(initialValue);
            setDirty(false);
        };

        const validate = (
            validator: (v: T) => string[] | null
        ) => validator(value);

        return {
            state: value,
            isDirty,
            setField,
            setAll,
            reset,
            validate,
        };
    }, [value, isDirty]);

    return { dispatch };
};
