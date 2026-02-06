import { EntityState } from "../hooks/entity/useEntityState";
import { DataCreatePresetProps } from "./types";

export const createDataCreatePresetProps = (
    crud: EntityState,
): DataCreatePresetProps => ({
    entity: crud.entity,
    payloadJson: crud.payloadJson,
    setPayloadJson: crud.setPayloadJson,
});
