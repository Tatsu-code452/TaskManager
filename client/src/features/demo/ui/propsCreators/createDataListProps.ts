import { ApiState } from "../../hooks/api/useApiState"
import { CrudState } from "../../hooks/crud/useCrudState"
import { DataListProps } from "../list/DataList";

export const createDataListProps = (
    crud: CrudState,
    api: ApiState
): DataListProps => ({
    entity: crud.entity,
    items: crud.items,
    selectedId: crud.selectedId,
    setItems: crud.setItems,
    setSelectedId: crud.setSelectedId,
    setApiResult: api.setApiResult,
    isFetching: api.isFetching,
});
