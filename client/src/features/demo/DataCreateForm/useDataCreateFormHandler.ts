import { success, error } from "../../../utils/notify";
import { useAsync } from "../../../utils/useAsync";
import { toNumberId } from "../utils/id";
import { parsePayload } from "../utils/payload/payload";
import { defaultPayloadFor } from "../utils/payload/default";
import { Entity, PayloadOf } from "../const/const";
import { useDataFetchHandler } from "../DataFetch/useDataFetchHandler";
import { useDataCreateFormLogic } from "./useDataCreateFormLogic";

// データ作成フォーム用カスタムフック
export const useDataCreateFormHandler = ({
    setSelectedId,
    isFetching,
    setIsFetching,
    newId,
    newName,
    payloadJson,
    entity,
    setItems,
}: {
    setSelectedId: (id: number) => void;
    isFetching: boolean;
    setIsFetching: (value: boolean) => void;
    newId: string;
    newName: string;
    payloadJson: string;
    entity: Entity;
    setItems,
}) => {
    const { handleFetch } = useDataFetchHandler({
        entity,
        isFetching,
        setSelectedId,
        setItems,
        setIsFetching,
    });
    const { onCreate } = useDataCreateFormLogic({ entity });

    const { execute, loading } = useAsync(onCreate);

    const createCommon = async (payload: PayloadOf<Entity>) => {
        const res = await execute(payload);
        if (res.ok === false) {
            error(res.error);
        } else {
            success(`${entity} 作成成功`);
            await handleFetch();
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