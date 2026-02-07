import { EntityState } from "../hooks/entity/useEntityState";
import { DataListHandler, DataListProps } from "./types";

export const createDataListProps = (
    crud: EntityState,
    dataListHandler: DataListHandler
): DataListProps => ({
    entity: crud.entity,
    items: crud.items,
    selectedId: crud.selectedId,
    onSelectedId: crud.setSelectedId,
    onDelete: dataListHandler.handleDelete
});

