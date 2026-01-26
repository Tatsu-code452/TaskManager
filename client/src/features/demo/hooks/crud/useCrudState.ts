import { useState } from "react";
import { Entity } from "../../const/demoConst";

// CRUD操作用のカスタムフック
export const useCrudState = () => {
    const [entity, setEntity] = useState<Entity>("tasks");
    const [items, setItems] = useState<any[]>([]);
    const [newId, setNewId] = useState("");
    const [newName, setNewName] = useState("");
    const [payloadJson, setPayloadJson] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

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
    };
};
