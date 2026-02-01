import { success as notifySuccess, error as notifyError } from "../../../../utils/notify";
import { useEntityApi } from "../api/useEntityApi";
import { Entity, DataItem } from "../../const/demoConst";

export const useEntityEffects = ({
    onItemsUpdated,
    onResult,
    onClearSelection,
    isFetching,
}: {
    onItemsUpdated: (items: DataItem[]) => void;
    onResult: (json: string) => void;
    onClearSelection: () => void;
    isFetching: React.RefObject<boolean>;
}) => {
    const { fetchList } = useEntityApi();

    const refreshList = async (entity: Entity) => {
        if (isFetching.current) return;
        isFetching.current = true;

        try {
            const res = await fetchList(entity);
            onItemsUpdated(res.data || []);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            isFetching.current = false;
        }
    };

    const handleSuccess = async (entity: Entity, res: any, action: string) => {
        onResult(JSON.stringify(res, null, 2));
        notifySuccess(`${entity} ${action} 成功`);
        onClearSelection();
        await refreshList(entity);
    };

    return { refreshList, handleSuccess };
};