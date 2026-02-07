import { Entity } from "../const/const";
import { useDeleteStateHandler } from "../hooks/entity/useDeleteStateHandler";

export const useDataListHandler = ({
    entity,
    onRefresh,
}: {
    entity: Entity;
    onRefresh: () => void;
}) => {
    const { handleDelete } = useDeleteStateHandler({
        entity,
        onRefresh,
    });

    return {
        handleDelete,
    };
}