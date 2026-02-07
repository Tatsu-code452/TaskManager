import { DataCreateFormHandler } from "../DataCreateForm/types";
import { EntityState } from "../hooks/entity/useEntityState";
import { DataCreateProps } from "./types";

export const createDataCreateProps = (
    crud: EntityState,
    dataCreateFormHandler: DataCreateFormHandler,
): DataCreateProps => ({
    crud: crud,
    dataCreateFormHandler: dataCreateFormHandler,
})