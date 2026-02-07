import { error, success } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { Entity, PayloadOf } from "../const/const";
import { useEntityActions } from "../hooks/entity/useEntityAction";
import { toNumberId } from "../utils/id";
import { defaultPayloadFor } from "../utils/payload/default";
import { parsePayload } from "../utils/payload/payload";

// データ作成フォーム用カスタムフック
export const useDataCreateFormHandler = ({
    newId,
    newName,
    payloadJson,
    entity,
    onRefresh,
}: {
    newId: string;
    newName: string;
    payloadJson: string;
    entity: Entity;
    onRefresh: () => void;
}) => {
    const { onCreate } = useEntityActions();

    const { execute, loading } = useAsync(onCreate);

    const createCommon = async (payload: PayloadOf<Entity>) => {
        const res = await execute(entity, payload);
        if (res.ok === false) {
            error(res.error);
        } else {
            success(`${entity} 作成成功`);
            await onRefresh();
        }
    };

    const handleCreate = async () => {
        await createCommon(parsePayload(newId, newName, payloadJson, entity));
    };

    const handleCreateAuto = async () => {
        await createCommon(defaultPayloadFor(entity, toNumberId(newId), newName));
    };

    return {
        handleCreate,
        handleCreateAuto,
        loading,
    };
};