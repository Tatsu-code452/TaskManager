import { Entity } from "../const/const";

export interface DataCreatePresetProps {
    entity: Entity;
    payloadJson: string;
    onChangePayloadJson: (string) => void;
}
