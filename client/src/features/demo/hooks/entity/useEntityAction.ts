import { toErrorMessage } from "../../../../utils/notify";
import { DataItem, Entity, PayloadOf } from "../../const/const";
import { Result } from "../../utils/result";
import { useEntityApi } from "../api/useEntityApi";

/** 成功/失敗だけ返す（C/U/D 用） */
const wrapVoid = async (fn: () => Promise<unknown>): Promise<Result<null>> => {
    try {
        await fn(); // 返り値は使わない
        return { ok: true, kind: "empty" };
    } catch (err) {
        return { ok: false, kind: "error", error: toErrorMessage(err) };
    }
};

/** データを返す（Fetch 用） */
const wrapFetch = async <T>(fn: () => Promise<T[]>): Promise<Result<T[]>> => {
    try {
        const list = await fn();

        return list.length === 0
            ? { ok: true, kind: "empty" }
            : { ok: true, kind: "data", data: list };

    } catch (err) {
        return { ok: false, kind: "error", error: toErrorMessage(err) };
    }
};

/**
 * CRUD 操作を UI 向け Result として提供する Hook
 * - Fetch だけデータを返す
 * - Create/Update/Delete は成功/失敗のみ返す
 */
export const useEntityActions = () => {
    const { fetchList, createItem, updateItem, deleteItem } = useEntityApi();

    return {
        onFetch: <E extends Entity>(entity: E) =>
            wrapFetch<DataItem>(() =>
                fetchList(entity).then(res => res.data)
            ),

        onCreate: <E extends Entity>(entity: E, payload: PayloadOf<E>) =>
            wrapVoid(() => createItem(entity, payload)),

        onUpdate: <E extends Entity>(entity: E, id: number, payload: PayloadOf<E>) =>
            wrapVoid(() => updateItem(entity, id, payload)),

        onDelete: (entity: Entity, id: number) =>
            wrapVoid(() => deleteItem(entity, id)),
    };
};