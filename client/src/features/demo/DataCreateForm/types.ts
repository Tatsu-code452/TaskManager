import { Result } from "../utils/result";
import { Entity, DataItem } from "../const/const";

export interface DataCreateFormProps {
    newId: string;
    newName: string;
    payloadJson: string;
    entity: Entity;
    setItems: React.Dispatch<React.SetStateAction<DataItem[]>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    isFetching: boolean;
    setIsFetching: (value: boolean) => void;
}

export type DataCreateResponse = string;

export type DataCreateResult = Result<DataCreateResponse>;
