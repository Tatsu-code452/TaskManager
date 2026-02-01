import { ApiState } from "../../hooks/api/useApiState"
import { CrudState } from "../../hooks/crud/useCrudState"
import { DataFetchProps } from "../list/DataFetch";

export const createDataFetchProps = (
    api: ApiState,
    crud: CrudState
): DataFetchProps => ({
    entity: crud.entity,
    setEntity: crud.setEntity,
    setItems: crud.setItems,
    setSelectedId: crud.setSelectedId,
    setPayloadJson: crud.setPayloadJson,
    setApiResult: api.setApiResult,
    isFetching: api.isFetching,
})
