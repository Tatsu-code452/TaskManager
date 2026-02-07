import { DataItem, Entity } from "../const/const";
import { useDataListHandler } from "./useDataListHandler";

export interface DataListProps {
    entity: Entity;
    items: DataItem[];
    selectedId: number | null;
    onSelectedId: (id: number) => void;
    onDelete: (id: number) => void;
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

export type DataListHandler = ReturnType<typeof useDataListHandler>;