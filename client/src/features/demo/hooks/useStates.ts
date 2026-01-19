import { useState } from "react";
import { Entity } from "../const/demoConst";

export const useStates = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [csrfToken, setCsrfToken] = useState("");
    const [loginResult, setLoginResult] = useState<string | null>(null);
    const [apiResult, setApiResult] = useState<string | null>(null);
    const [entity, setEntity] = useState<Entity>("tasks");
    const [items, setItems] = useState<any[]>([]);
    const [newId, setNewId] = useState("");
    const [newName, setNewName] = useState("");
    const [payloadJson, setPayloadJson] = useState<string>("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return {
        username,
        setUsername,
        password,
        setPassword,
        csrfToken,
        setCsrfToken,
        loginResult,
        setLoginResult,
        apiResult,
        setApiResult,
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
        setSelectedId
    };
};
