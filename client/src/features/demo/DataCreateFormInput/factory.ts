import { EntityState } from "../hooks/entity/useEntityState";
import { DataCreateFormInputProps } from "./types";

export const createDataCreateFormInputProps = (
    crud: EntityState,
): DataCreateFormInputProps => ({
    newId: crud.newId,
    newName: crud.newName,
    onChangeNewId: crud.setNewId,
    onChangeNewName: crud.setNewName,
});
