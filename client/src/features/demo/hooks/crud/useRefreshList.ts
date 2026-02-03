import { error as notifyError } from "../../../../utils/notify";
import { useEntityApi } from "../api/useEntityApi";
import { Entity, DataItem } from "../../const/const";

export const useRefreshList = ({
    onItemsUpdated,
    isFetching,
}: {
    onItemsUpdated: (items: DataItem[]) => void;
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

    return { refreshList };
};