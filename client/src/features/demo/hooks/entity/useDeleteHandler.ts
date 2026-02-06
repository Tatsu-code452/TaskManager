import { error, success } from "../../../../utils/notify";
import { useAsync } from "../../../../utils/useAsync";
import { DataItem, Entity } from "../../const/const";
import { useFetchHandler } from "../../hooks/entity/useFetchHandler";
import { useEntityActions } from "./useEntityAction";

export const useDeleteHandler = ({
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
    const { onDelete } = useEntityActions();
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
            return;
        }

        success(`${entity} 削除成功`);
        setSelectedId(null);
        await handleFetch();
    };

    return {
        handleDelete,
        loading,
    };
}