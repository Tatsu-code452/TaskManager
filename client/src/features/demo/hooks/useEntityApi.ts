import { useApi } from "./useApi";
import { Entity } from "../const/demoConst";

export const useEntityApi = () => {
    const { requestGet, requestPost, requestPut, requestDelete } = useApi();

    return {
        fetchList: (entity: Entity) => requestGet(entity),
        createItem: (entity: Entity, payload: any) => requestPost(entity, payload),
        updateItem: (entity: Entity, id: number, payload: any) =>
            requestPut(entity, id, payload),
        deleteItem: (entity: Entity, id: number) =>
            requestDelete(entity, id),
    };
};