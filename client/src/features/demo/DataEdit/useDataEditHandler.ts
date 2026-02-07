import { error, success } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { Entity, PayloadOf } from "../const/const";
import { useDeleteStateHandler } from "../hooks/entity/useDeleteStateHandler";
import { useEntityActions } from "../hooks/entity/useEntityAction";
import { defaultPayloadFor } from "../utils/payload/default";
import { parsePayload } from "../utils/payload/payload";

export const useDataEditHandler = ({
    selectedId,
    newName,
    payloadJson,
    entity,
    onChangeSelectedId,
    onRefresh,
}: {
    selectedId: number | null;
    newName: string;
    payloadJson: string;
    entity: Entity;
    onChangeSelectedId: (id: number) => void;
    onRefresh: () => void;
}) => {
    const { handleDelete } = useDeleteStateHandler({
        entity,
        onRefresh,
    });

    const { onUpdate } = useEntityActions();

    const isUpdate = () => {
        if (selectedId == null) {
            error("更新対象を選択してください");
            return false;
        }
        return true;
    }

    const { execute, loading } = useAsync(onUpdate);
    // 更新を行う
    const updateCommon = async (payload: PayloadOf<Entity>) => {
        if (isUpdate() === false) {
            return;
        }
        const res = await execute(entity, selectedId, payload);
        if (res.ok === false) {
            error(res.error);
        } else {
            success(`${entity} 更新成功`);
            onChangeSelectedId(null);
            await onRefresh();
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
        loading,
    };
}