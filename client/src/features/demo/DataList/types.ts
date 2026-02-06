import { Result } from "../utils/result";
import { Entity, DataItem } from "../const/const";

export interface DataListProps {
    entity: Entity;
    items: DataItem[];
    selectedId: number | null;
    setItems: React.Dispatch<
        React.SetStateAction<Array<Record<string, unknown>>>
    >;
    setSelectedId: (id: number) => void;
    isFetching: boolean;
    setIsFetching: (value: boolean) => void;
}

export interface HeaderRowProps {
    columns: string[];
}

export interface DataRowProps {
    item: DataItem;
    columns: string[];
    selected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}

export type DataListResponse = string;

export type DataListResult = Result<DataListResponse>;
