import { error } from "../../../../utils/notify";
import { toNumberId } from "../../utils/id";
import { parsePayload } from "../../utils/payload/payload";
import { defaultPayloadFor } from "../../utils/payload/default";
import { Entity, PayloadOf } from "../../const/const";
import { useEntityApi } from "../api/useEntityApi";
import { useEffectsSuccess } from "../useEffectsSuccess";
import { useRefreshList } from "./useRefreshList";

// データ作成フォーム用カスタムフック
export const useDataCreateForm = <E extends Entity>({
    newId,
    newName,
    payloadJson,
    entity,
    effectsSuccess,
    effectsRefresh,
    api = useEntityApi(),
    onError = error,
}: {
    newId: string;
    newName: string;
    payloadJson: string;
    entity: E;
    effectsSuccess: ReturnType<typeof useEffectsSuccess>;
    effectsRefresh: ReturnType<typeof useRefreshList>;
    api?: ReturnType<typeof useEntityApi>;
    onError?: (msg: string) => void;
}) => {
    const { createItem } = api;
    const { handleSuccess } = effectsSuccess;
    const { refreshList } = effectsRefresh;

    const executeCreate = async (payload: PayloadOf<E>) => {
        try {
            const res = await createItem<E>(entity, payload);
            await handleSuccess(entity, res, "作成");
            await refreshList(entity);
            return res;
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            onError(msg);
        }
    }

    return {
        create: () =>
            executeCreate(parsePayload(newId, newName, payloadJson, entity)),
        createAuto: () =>
            executeCreate(defaultPayloadFor(entity, toNumberId(newId), newName)),
    };
};