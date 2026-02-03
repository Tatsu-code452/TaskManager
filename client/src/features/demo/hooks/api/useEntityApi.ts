import { useApi } from "./useApi";
import { Entity, PayloadOf, DataItem } from "../../const/const";

/**
 * エンティティ別API操作用カスタムフック
 */
export const useEntityApi = () => {
    const { get, post, put, del } = useApi();

    return {
        /**
         * 一覧取得
         */
        fetchList: <E extends Entity>(entity: E) => get<{ data: DataItem[] }>(entity),

        /**
         * 新規作成
         */
        createItem: <E extends Entity>(entity: E, payload: PayloadOf<E>) => post(entity, payload),

        /**
         * 更新
         */
        updateItem: <E extends Entity>(entity: E, id: number, payload: PayloadOf<E>) => put(entity, id, payload),

        /**
         * 削除
         */
        deleteItem: (entity: Entity, id: number) => del(entity, id),
    };
};