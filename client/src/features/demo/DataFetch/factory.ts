import { ApiState } from "../hooks/api/useApiState";
import { EntityState } from "../hooks/entity/useEntityState";
import { DataFetchProps } from "./types";

export const createDataFetchProps = (
    api: ApiState,
    crud: EntityState,
): DataFetchProps => ({
    entity: crud.entity,
    setEntity: crud.setEntity,
    setItems: crud.setItems,
    setSelectedId: crud.setSelectedId,
    setPayloadJson: crud.setPayloadJson,
    setApiResult: api.setApiResult,
    isFetching: api.isFetching,
    setIsFetching: api.setIsFetching,
});
