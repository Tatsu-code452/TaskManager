import { error as notifyError } from "../../../utils/notify";
import { Entity } from "../const/demoConst";
import { useEntityApi } from "./useEntityApi";
import { useEntityEffects } from "./useEntityEffects";
import { useEntityPresets } from "./useEntityPresets";

export const useDataEdit = ({ selectedId, newName, payloadJson, entity, effects }: {
    selectedId: number | null;
    newName: string;
    payloadJson: string;
    entity: Entity;
    effects: ReturnType<typeof useEntityEffects>;
}) => {
    const { handleSuccess } = effects;
    const { updateItem, deleteItem } = useEntityApi();
    const { defaultPayloadFor } = useEntityPresets();

    // 更新
    const update = async () => {
        if (selectedId == null) {
            notifyError("更新対象を選択してください");
            return;
        }
        try {
            const payload = payloadJson.trim()
                ? JSON.parse(payloadJson)
                : { name: newName || `updated-${Date.now()}` };
            const res = await updateItem(entity, selectedId, payload);
            await handleSuccess(entity, res, "更新");
        } catch (err: any) {
            notifyError(err?.message || String(err));
        }
    };

    // 自動生成ペイロードで更新（選択ID を使う）
    const updateAuto = async () => {
        if (selectedId == null) {
            notifyError("更新対象を選択してください");
            return;
        }
        try {
            const payload = defaultPayloadFor(
                entity,
                selectedId,
                `updated-${Date.now()}`
            );
            const res = await updateItem(entity, selectedId, payload);
            await handleSuccess(entity, res, "更新");
        } catch (err: any) {
            notifyError(err?.message || String(err));
        }
    };

    // 選択IDを削除
    const deleteId = async () => {
        if (selectedId == null) {
            notifyError("削除対象を選択してください");
            return;
        }
        try {
            const res = await deleteItem(entity, selectedId);
            await handleSuccess(entity, res, "削除");
        } catch (err: any) {
            notifyError(err?.message || String(err));
        }
    };

    return {
        update,
        updateAuto,
        deleteId,
    };

}