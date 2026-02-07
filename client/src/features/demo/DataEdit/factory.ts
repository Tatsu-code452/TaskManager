import { EntityState } from "../hooks/entity/useEntityState";
import { DataEditHandler, DataEditProps } from "./types";

export const createDataEditProps = (
    crud: EntityState,
    dataEditHandler: DataEditHandler
): DataEditProps => ({
    selectedId: crud.selectedId,
    loading: dataEditHandler.loading,
    onDelete: dataEditHandler.handleDelete,
    onUpdate: dataEditHandler.handleUpdate,
    onUpdateAuto: dataEditHandler.handleUpdateAuto
});
