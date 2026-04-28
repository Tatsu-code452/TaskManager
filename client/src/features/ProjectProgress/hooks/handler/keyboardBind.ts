import { useCallback } from "react";

type KeyBind = Partial<Record<string, (e: React.KeyboardEvent) => void>>;

const keyFromEvent = (e: React.KeyboardEvent) => {
    let key = e.key;
    if (e.shiftKey) key = "Shift+" + key;
    if (e.ctrlKey) key = "Ctrl+" + key;
    return key;
}

export const useKeyboardBind = () => {
    const handleKeyDown = useCallback((binds: KeyBind, e: React.KeyboardEvent) => {
        const key = keyFromEvent(e);
        const fn = binds[key] ?? binds[e.key];
        if (!fn) return;

        e.preventDefault();
        fn(e);
    }, []);

    return { handleKeyDown };
};
