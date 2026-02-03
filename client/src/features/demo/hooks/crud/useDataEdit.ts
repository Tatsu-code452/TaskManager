import { error } from "../../../../utils/notify";
import { parsePayload } from "../../utils/payload/payload";
import { defaultPayloadFor } from "../../utils/payload/default";
import { Entity, PayloadOf } from "../../const/const";
import { useEntityApi } from "../api/useEntityApi";
import { useEntityEffects } from "./useEntityEffects";

export const useDataEdit = <E extends Entity>({ selectedId, newName, payloadJson, entity, effects }: {
    selectedId: number | null;
    newName: string;
    payloadJson: string;
    entity: E;
    effects: ReturnType<typeof useEntityEffects>;
}) => {
    const { handleSuccess } = effects;
    const { updateItem, deleteItem } = useEntityApi();

    const executeUpdate = async (payload: PayloadOf<E>) => {
        try {
            const res = await updateItem(entity, selectedId, payload);
            await handleSuccess(entity, res, "更新");
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            error(msg);
        }
    }

    const isUpdate = () => {
        if (selectedId == null) {
            error("更新対象を選択してください");
            return false;
        }
        return true;
    }

    // 更新
    const update = async () => {
        if (isUpdate()) {
            executeUpdate(parsePayload(String(selectedId),
                newName,
                payloadJson,
                entity));
        }
    };

    // 自動生成ペイロードで更新（選択ID を使う）
    const updateAuto = async () => {
        if (isUpdate()) {
            executeUpdate(defaultPayloadFor(
                entity,
                selectedId
            ));
        }
    };

    // 選択IDを削除
    const deleteId = async () => {
        if (selectedId == null) {
            error("削除対象を選択してください");
            return;
        }
        try {
            const res = await deleteItem(entity, selectedId);
            await handleSuccess(entity, res, "削除");
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            error(msg);
        }
    };

    return {
        update,
        updateAuto,
        deleteId,
    };

}