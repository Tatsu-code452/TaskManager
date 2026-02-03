import { error } from "../../../../utils/notify";
import { Entity } from "../../const/const";
import { useEntityApi } from "../api/useEntityApi";
import { useEntityEffects } from "./useEntityEffects";

export const useDataList = <E extends Entity>({ entity, effects }: {
    entity: E;
    effects: ReturnType<typeof useEntityEffects>;
}) => {
    const { handleSuccess } = effects;
    const { deleteItem } = useEntityApi();

    // 選択IDを削除
    const deleteId = async (id?: number) => {
        if (id == null) {
            error("削除対象を選択してください");
            return;
        }
        try {
            const res = await deleteItem(entity, id);
            await handleSuccess(entity, res, "削除");
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            error(msg);
        }
    };

    return {
        deleteId,
    };

}