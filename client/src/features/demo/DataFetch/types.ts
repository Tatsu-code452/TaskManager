import { Entity } from "../const/const";

export interface DataFetchProps {
    entity: Entity;
    onChangeEntity: (entity: Entity) => void;
    onReset: () => void;
    onFetch: () => void;
}

export type DataFetchHandler = {
    onChangeEntity: (entity: Entity) => void;
    onReset: () => void;
    onFetch: () => void;
}