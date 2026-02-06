import { toErrorMessage } from "../../../utils/notify";
import { Entity, PayloadOf } from "../const/const";
import { useEntityApi } from "../hooks/api/useEntityApi";
import { DataCreateResult } from "./types";

// データ作成フォーム用カスタムフック
export const useDataCreateFormLogic = ({
    entity,
}: {
    entity: Entity;
}) => {
    const { createItem } = useEntityApi();

    const onCreate = async (payload: PayloadOf<Entity>): Promise<DataCreateResult> => {
        try {
            await createItem<Entity>(entity, payload);
            return { ok: true, kind: "empty" } as const
        } catch (err) {
            return { ok: false, kind: "error", error: toErrorMessage(err) } as const;
        }
    }

    return {
        onCreate,
    };
};