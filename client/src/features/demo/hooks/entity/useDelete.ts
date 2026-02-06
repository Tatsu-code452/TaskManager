import { toErrorMessage } from "../../../../utils/notify";
import { useEntityApi } from "../api/useEntityApi";
import { Entity } from "../../const/const";
import { Result } from "../../utils/result";

export const useDelete = () => {
    const { deleteItem } = useEntityApi();

    // 選択IDを削除
    const onDelete = async (entity: Entity, id: number): Promise<Result<unknown>> => {
        try {
            await deleteItem(entity, id);
            return { ok: true, kind: "empty" } as const
        } catch (err) {
            return { ok: false, kind: "error", error: toErrorMessage(err) } as const;
        }
    };

    return {
        onDelete,
    };
}