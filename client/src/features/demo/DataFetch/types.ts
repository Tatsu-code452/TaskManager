import { Entity, DataItem } from "../const/const";

export interface DataFetchProps {
    entity: Entity;
    setEntity: React.Dispatch<React.SetStateAction<Entity>>;
    setItems: React.Dispatch<React.SetStateAction<DataItem[]>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setPayloadJson: React.Dispatch<React.SetStateAction<string>>;
    setApiResult: React.Dispatch<React.SetStateAction<string | null>>;
    isFetching: boolean;
    setIsFetching: (value: boolean) => void;
}
