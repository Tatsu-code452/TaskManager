import { ApiState } from "../hooks/api/useApiState";
import { EntityState } from "../hooks/entity/useEntityState";
import { DataEditProps } from "./types";

export const createDataEditProps = (
    crud: EntityState,
    api: ApiState,
): DataEditProps => ({
    selectedId: crud.selectedId,
    setSelectedId: crud.setSelectedId,
    isFetching: api.isFetching,
    setIsFetching: api.setIsFetching,
    newName: crud.newName,
    payloadJson: crud.payloadJson,
    entity: crud.entity,
    setItems: crud.setItems,
});
