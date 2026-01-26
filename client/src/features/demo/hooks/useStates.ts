import { useAuthState } from "./auth/useAuthState";
import { useApiState } from "./api/useApiState";
import { useCrudState } from "./crud/useCrudState";

// すべての状態をまとめて返すカスタムフック
export const useStates = () => {
    return {
        auth: useAuthState(),
        api: useApiState(),
        crud: useCrudState(),
    };
};
