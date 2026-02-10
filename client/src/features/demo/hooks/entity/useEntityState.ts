import { useState } from "react";
import { DataItem, Entity } from "../../const/const";

// CRUD操作用のカスタムフック
export const useEntityState = () => {
    const [entity, setEntity] = useState<Entity>("tasks");
    const [items, setItems] = useState<DataItem[]>([]);
    const [newId, setNewId] = useState("");
    const [newName, setNewName] = useState("");
    const [payloadJson, setPayloadJson] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const onReset = () => {
        setItems([]);
        setSelectedId(null);
        setPayloadJson("");
    };

    return {
        entity,
        setEntity,
        items,
        setItems,
        newId,
        setNewId,
        newName,
        setNewName,
        payloadJson,
        setPayloadJson,
        selectedId,
        setSelectedId,
        onReset,
    };
};

export type EntityState = ReturnType<typeof useEntityState>;