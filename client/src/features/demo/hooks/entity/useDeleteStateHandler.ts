import { error, success } from "../../../../utils/notify";
import { useAsync } from "../../../../utils/useAsync";
import { Entity } from "../../const/const";
import { useEntityActions } from "./useEntityAction";

export const useDeleteStateHandler = ({
    entity,
    onRefresh,
}: {
    entity: Entity;
    onRefresh: () => void;
}) => {
    const { onDelete } = useEntityActions();

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
        await onRefresh();
    };

    return {
        handleDelete,
        loading,
    };
}