import { error, success } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { Entity, PayloadOf } from "../const/const";
import { useDeleteHandler } from "../hooks/entity/useDeleteHandler";
import { useEntityActions } from "../hooks/entity/useEntityAction";
import { useFetchHandler } from "../hooks/entity/useFetchHandler";
import { defaultPayloadFor } from "../utils/payload/default";
import { parsePayload } from "../utils/payload/payload";

export const useDataEditHandler = ({
    selectedId,
    setSelectedId,
    isFetching,
    setIsFetching,
    newName,
    payloadJson,
    entity,
    setItems,
}: {
    selectedId: number | null;
    setSelectedId: (id: number) => void;
    isFetching: boolean;
    setIsFetching: (value: boolean) => void;
    setItems,
    newName: string;
    payloadJson: string;
    entity: Entity;
}) => {
    const { handleDelete } = useDeleteHandler({
        entity,
        isFetching,
        setSelectedId,
        setItems,
        setIsFetching,
    });
    const { onUpdate } = useEntityActions();
    const { handleFetch } = useFetchHandler({
        entity,
        isFetching,
        setSelectedId,
        setItems,
        setIsFetching,
    });

    const isUpdate = () => {
        if (selectedId == null) {
            error("更新対象を選択してください");
            return false;
        }
        return true;
    }

    const { execute: executeUpdate, loading: loadingUpdate } = useAsync(onUpdate);
    // 更新を行う
    const updateCommon = async (payload: PayloadOf<Entity>) => {
        if (isUpdate() === false) {
            return;
        }
        const res = await executeUpdate(entity, selectedId, payload);
        if (res.ok === false) {
            error(res.error);
        } else {
            success(`${entity} 更新成功`);
            setSelectedId(null);
            await handleFetch();
        }
    };

    // 更新を行う
    const handleUpdate = async () => {
        await updateCommon(parsePayload(String(selectedId),
            newName,
            payloadJson,
            entity));
    };

    // 自動生成ペイロードで更新（選択ID を使う）
    const handleUpdateAuto = async () => {
        await updateCommon(defaultPayloadFor(
            entity,
            selectedId
        ));
    };

    return {
        handleDelete,
        handleUpdate,
        handleUpdateAuto,
        loadingUpdate,
    };
}