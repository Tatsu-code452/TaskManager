import { useState } from "react";

export const useStateObj = <T extends object>(initialValue: T) => {
    const [state, setState] = useState<T>(initialValue);

    return {
        dispatch: {
            state,
            setState,
        }
    }
}