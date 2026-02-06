import { success, error } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { Entity, DataItem } from "../const/const";
import { useDelete } from "../hooks/entity/useDelete";
import { useFetchHandler } from "../hooks/entity/useFetchHandler";

export const useDataListHandler = ({
    entity,
    isFetching,
    setSelectedId,
    setItems,
    setIsFetching,
}: {
    entity: Entity;
    isFetching: boolean;
    setItems: (items: DataItem[]) => void;
    setSelectedId: (id: number | null) => void;
    setIsFetching: (value: boolean) => void;
}) => {
    const { onDelete } = useDelete();
    const { handleFetch } = useFetchHandler({
        entity,
        isFetching,
        setSelectedId,
        setItems,
        setIsFetching,
    });

    const { execute, loading } = useAsync(onDelete);

    const handleDelete = async (id: number) => {
        if (id == null) {
            error("削除対象を選択してください");
            return;
        }
        const res = await execute(entity, id);
        if (res.ok === false) {
            error(res.error);
        } else {
            success(`${entity} 削除成功`);
            setSelectedId(null);
            await handleFetch();
        }
    };

    return {
        handleDelete,
        loading,
    };
}