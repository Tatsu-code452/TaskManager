import { Entity } from "../const/const";

export interface DataCreatePresetProps {
    entity: Entity;
    payloadJson: string;
    setPayloadJson: React.Dispatch<React.SetStateAction<string>>;
}
