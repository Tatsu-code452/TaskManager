import { DataItem, Entity } from "../const/const";
import { useDeleteHandler } from "../hooks/entity/useDeleteHandler";

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
    const { handleDelete } = useDeleteHandler({
        entity,
        isFetching,
        setSelectedId,
        setItems,
        setIsFetching,
    });

    return {
        handleDelete,
    };
}