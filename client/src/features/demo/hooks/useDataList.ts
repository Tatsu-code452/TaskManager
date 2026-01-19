import { error as notifyError } from "../../../utils/notify";
import { Entity } from "../const/demoConst";
import { useEntityApi } from "./useEntityApi";
import { useEntityEffects } from "./useEntityEffects";

export const useDataList = ({ selectedId, entity, effects }: {
    selectedId: number | null;
    entity: Entity;
    effects: ReturnType<typeof useEntityEffects>;
}) => {
    const { handleSuccess } = effects;
    const { deleteItem } = useEntityApi();

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
        deleteId,
    };

}