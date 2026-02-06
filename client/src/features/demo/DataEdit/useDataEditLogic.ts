import { toErrorMessage } from "../../../utils/notify";
import { Entity, PayloadOf } from "../const/const";
import { useEntityApi } from "../hooks/api/useEntityApi";
import { DataEditResult } from "./types";

export const useDataEditLogic = ({
    selectedId,
    entity,
}: {
    selectedId: number | null;
    entity: Entity;
}) => {
    const { updateItem } = useEntityApi();

    const onUpdate = async (payload: PayloadOf<Entity>): Promise<DataEditResult> => {
        try {
            await updateItem(entity, selectedId, payload);
            return { ok: true, kind: "empty" } as const
        } catch (err) {
            return { ok: false, kind: "error", error: toErrorMessage(err) } as const;
        }
    }

    return {
        onUpdate,
    };
}