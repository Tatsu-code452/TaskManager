import { ApiState } from "../../hooks/api/useApiState"
import { CrudState } from "../../hooks/crud/useCrudState"
import { DataCreatePresetProps } from "../edit/DataCreatePreset";
import { DataCreateFormInputProps } from "../edit/DataCreateFormInput";
import { DataCreateFormProps } from "../edit/DataCreateForm";

export const createDataCreatePresetProps = (
    crud: CrudState
): DataCreatePresetProps => ({
    entity: crud.entity,
    payloadJson: crud.payloadJson,
    setPayloadJson: crud.setPayloadJson,
});

export const createDataCreateFormInputProps = (
    crud: CrudState
): DataCreateFormInputProps => ({
    newId: crud.newId,
    newName: crud.newName,
    setNewId: crud.setNewId,
    setNewName: crud.setNewName,
});

export const createDataCreateFormProps = (
    crud: CrudState,
    api: ApiState
): DataCreateFormProps => ({
    newId: crud.newId,
    newName: crud.newName,
    payloadJson: crud.payloadJson,
    entity: crud.entity,
    setItems: crud.setItems,
    setSelectedId: crud.setSelectedId,
    setApiResult: api.setApiResult,
    isFetching: api.isFetching,
});
