import { useApi } from "./useApi";
import { Entity, PayloadOf } from "../../const/demoConst";

// エンティティ別APIカスタムフック
export const useEntityApi = () => {
    const { requestGet, requestPost, requestPut, requestDelete } = useApi();

    return {
        fetchList: <E extends Entity>(entity: E) =>
            requestGet(entity),

        createItem: <E extends Entity>(entity: E, payload: PayloadOf<E>) =>
            requestPost(entity, payload),

        updateItem: <E extends Entity>(entity: E, id: number, payload: PayloadOf<E>) =>
            requestPut(entity, id, payload),

        deleteItem: (entity: Entity, id: number) =>
            requestDelete(entity, id),
    };
};