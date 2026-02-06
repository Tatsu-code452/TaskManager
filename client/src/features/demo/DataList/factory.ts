import { ApiState } from "../hooks/api/useApiState"
import { EntityState } from "../hooks/entity/useEntityState"
import { DataListProps } from "./types";

export const createDataListProps = (
    crud: EntityState,
    api: ApiState
): DataListProps => ({
    entity: crud.entity,
    items: crud.items,
    selectedId: crud.selectedId,
    setItems: crud.setItems,
    setSelectedId: crud.setSelectedId,
    isFetching: api.isFetching,
    setIsFetching: api.setIsFetching
});
