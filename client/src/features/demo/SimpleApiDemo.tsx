import React from "react";
import "./SimpleApiDemo.css";
import { useStates } from "./hooks/useStates";
import Login from "./components/Login";
import Token from "./components/Token";
import TableMaintenance from "./components/TableMaintenance";
import DataCreate from "./components/DataCreate";
import DataEdit from "./components/DataEdit";
import DataList from "./components/DataList";
import ResponseApi from "./components/ResponseApi";

const SimpleApiDemo: React.FC = () => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        loginResult,
        setLoginResult,
        csrfToken,
        setCsrfToken,
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
        setSelectedId,
    } = useStates();

    return (
        <div className="demo-container">
            <h2 className="demo-title">簡易APIデモ画面</h2>
            <Login
                username={username}
                password={password}
                loginResult={loginResult}
                setUsername={setUsername}
                setPassword={setPassword}
                setCsrfToken={setCsrfToken}
                setLoginResult={setLoginResult}
            />

            <hr />

            <Token
                csrfToken={csrfToken}
                setCsrfToken={setCsrfToken}
                setLoginResult={setLoginResult}
            />

            <hr />

            <h3>汎用 CRUD デモ</h3>

            <TableMaintenance
                entity={entity}
                setEntity={setEntity}
                setItems={setItems}
                setSelectedId={setSelectedId}
                setPayloadJson={setPayloadJson}
                setApiResult={setApiResult}
                isFetching={React.useRef(false)}
            />

            <DataCreate
                newId={newId}
                newName={newName}
                payloadJson={payloadJson}
                entity={entity}
                setItems={setItems}
                setSelectedId={setSelectedId}
                setApiResult={setApiResult}
                setNewId={setNewId}
                setNewName={setNewName}
                setPayloadJson={setPayloadJson}
                isFetching={React.useRef(false)}
            />

            <DataEdit
                selectedId={selectedId}
                newName={newName}
                payloadJson={payloadJson}
                entity={entity}
                setItems={setItems}
                setSelectedId={setSelectedId}
                setApiResult={setApiResult}
                isFetching={React.useRef(false)}
            />

            <DataList
                entity={entity}
                items={items}
                selectedId={selectedId}
                setItems={setItems}
                setSelectedId={setSelectedId}
                setApiResult={setApiResult}
                isFetching={React.useRef(false)}
            />

            <ResponseApi apiResult={apiResult} />
        </div>
    );
};

export default SimpleApiDemo;
