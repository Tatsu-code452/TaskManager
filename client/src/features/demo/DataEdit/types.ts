import { Result } from "../utils/result";
import { Entity, DataItem } from "../const/const";

export interface DataEditProps {
    selectedId: number | null;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    isFetching: boolean;
    setIsFetching: (value: boolean) => void;
    newName: string;
    payloadJson: string;
    entity: Entity;
    setItems: React.Dispatch<React.SetStateAction<DataItem[]>>;
}

export type DataEditResponse = string;

export type DataEditResult = Result<DataEditResponse>;
