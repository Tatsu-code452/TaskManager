import {
    success as notifySuccess,
    error as notifyError,
} from "../../../utils/notify";
import { Entity } from "../const/demoConst";
import { useApi } from "./useApi";

export const useEffect = ({
    onItemsUpdated,
    onResult,
    onClearSelection,
    isFetching,
}: {
    onItemsUpdated: (items: any[]) => void;
    onResult: (json: string) => void;
    onClearSelection: () => void;
    isFetching: React.RefObject<boolean>;
}) => {
    const { requestGet } = useApi();

    // 汎用一覧取得
    const handleFetch = async (entity: Entity) => {
        if (isFetching.current) return;
        isFetching.current = true;
        try {
            const res = await requestGet(entity);
            onItemsUpdated(res.data || []);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            isFetching.current = false;
        }
    };

    // 共通成功後のUI副作用
    const handleSuccess = async (entity: Entity, res: any, action: string) => {
        // 結果表示
        onResult(JSON.stringify(res, null, 2));
        notifySuccess(`${entity} ${action} 成功`);
        // 選択IDクリア
        onClearSelection();
        // 一覧再取得
        await handleFetch(entity);
    };

    return {
        handleFetch, handleSuccess
    };

}