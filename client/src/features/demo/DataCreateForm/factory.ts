import { ApiState } from "../hooks/api/useApiState";
import { EntityState } from "../hooks/entity/useEntityState";
import { DataCreateFormProps } from "./types";

export const createDataCreateFormProps = (
    crud: EntityState,
    api: ApiState,
): DataCreateFormProps => ({
    newId: crud.newId,
    newName: crud.newName,
    payloadJson: crud.payloadJson,
    entity: crud.entity,
    setItems: crud.setItems,
    setSelectedId: crud.setSelectedId,
    isFetching: api.isFetching,
    setIsFetching: api.setIsFetching,
});
