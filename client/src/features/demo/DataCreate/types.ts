import { DataCreateFormHandler } from "../DataCreateForm/types";
import { EntityState } from "../hooks/entity/useEntityState";

export interface DataCreateProps {
    crud: EntityState;
    dataCreateFormHandler: DataCreateFormHandler;
};