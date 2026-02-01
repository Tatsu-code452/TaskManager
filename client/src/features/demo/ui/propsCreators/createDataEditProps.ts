import { ApiState } from "../../hooks/api/useApiState"
import { CrudState } from "../../hooks/crud/useCrudState"
import { DataEditProps } from "../edit/DataEdit";

export const createDataEditProps = (
    crud: CrudState,
    api: ApiState
): DataEditProps => ({
    selectedId: crud.selectedId,
    newName: crud.newName,
    payloadJson: crud.payloadJson,
    entity: crud.entity,
    setItems: crud.setItems,
    setSelectedId: crud.setSelectedId,
    setApiResult: api.setApiResult,
    isFetching: api.isFetching,
});
