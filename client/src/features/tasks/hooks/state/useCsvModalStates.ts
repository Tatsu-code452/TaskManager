import { useState } from "react";

export const useCsvModalStates = () => {
    const [text, setText] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const reset = () => {
        setText("");
        setErrors([]);
    }

    return {
        text, errors,
        setText,
        setErrors,
        reset,
    }
}