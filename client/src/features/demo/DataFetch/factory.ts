import { EntityState } from "../hooks/entity/useEntityState";
import { DataFetchHandler, DataFetchProps } from "./types";

export const createDataFetchProps = (
    crud: EntityState,
    dataFetchHandler: DataFetchHandler,
): DataFetchProps => ({
    entity: crud.entity,
    onChangeEntity: crud.setEntity,
    onReset: dataFetchHandler.onReset,
    onFetch: dataFetchHandler.onFetch,
});
