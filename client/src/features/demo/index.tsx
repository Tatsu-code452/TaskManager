import React from "react";

import "./index.css";

import { useApiState } from "./hooks/api/useApiState";
import { useAuthState } from "./hooks/auth/useAuthState";
import { useEntityState } from "./hooks/entity/useEntityState";

import DataCreate from "./DataCreate";
import { createDataCreateProps } from "./DataCreate/factory";
import { useDataCreateFormHandler } from "./DataCreateForm/useDataCreateFormHandler";
import DataEdit from "./DataEdit";
import { createDataEditProps } from "./DataEdit/factory";
import { useDataEditHandler } from "./DataEdit/useDataEditHandler";
import DataFetch from "./DataFetch";
import { createDataFetchProps } from "./DataFetch/factory";
import { DataFetchHandler } from "./DataFetch/types";
import DataList from "./DataList";
import { createDataListProps } from "./DataList/factory";
import { useDataListHandler } from "./DataList/useDataListHandler";
import { useFetchStateHandler } from "./hooks/entity/useFetchStateHandler";
import Login from "./Login";
import { createLoginProps } from "./Login/factory";
import { useLoginHandler } from "./Login/useLoginHandler";
import ResponseApi from "./ResponseApi";
import { createApiResultProps } from "./ResponseApi/factory";
import Token from "./Token";
import { createTokenProps } from "./Token/factory";
import { useTokenHandler } from "./Token/useTokenHandler";

const SimpleApiDemo: React.FC = () => {
    const auth = useAuthState();
    const api = useApiState();
    const crud = useEntityState();

    const fetchHandler = useFetchStateHandler({
        entity: crud.entity,
        isFetching: api.isFetching,
        onChangeSelectedId: crud.setSelectedId,
        onChangeItems: crud.setItems,
        onChangeIsFetching: api.setIsFetching,
    });

    const dataCreateFormHandler = useDataCreateFormHandler({
        newId: crud.newId,
        newName: crud.newName,
        payloadJson: crud.payloadJson,
        entity: crud.entity,
        onRefresh: fetchHandler.handleFetch,
    });

    const tokenHandler = useTokenHandler({
        setCsrfToken: auth.setCsrfToken,
    });

    const loginHandler = useLoginHandler({
        username: auth.username,
        password: auth.password,
        setLoginResult: auth.setLoginResult,
        onFetchToken: tokenHandler.onFetchToken,
    });

    const onReset = () => {
        crud.setItems([]);
        crud.setSelectedId(null);
        crud.setPayloadJson("");
    };

    const dataFetchHandler: DataFetchHandler = {
        onChangeEntity: crud.setEntity,
        onReset: onReset,
        onFetch: fetchHandler.handleFetch,
    };

    const dataListHandler = useDataListHandler({
        entity: crud.entity,
        onRefresh: fetchHandler.handleFetch,
    });

    const dataEditHandler = useDataEditHandler({
        selectedId: crud.selectedId,
        newName: crud.newName,
        payloadJson: crud.payloadJson,
        entity: crud.entity,
        onChangeSelectedId: crud.setSelectedId,
        onRefresh: fetchHandler.handleFetch,
    });

    return (
        <div className="demo-container">
            <h2 className="demo-title">簡易APIデモ画面</h2>
            <Login {...createLoginProps(auth, loginHandler)} />
            <hr />

            <Token {...createTokenProps(auth, tokenHandler)} />
            <hr />

            <h3>汎用 CRUD デモ</h3>

            <DataFetch {...createDataFetchProps(crud, dataFetchHandler)} />

            <DataCreate
                {...createDataCreateProps(crud, dataCreateFormHandler)}
            />

            <DataEdit {...createDataEditProps(crud, dataEditHandler)} />

            <DataList {...createDataListProps(crud, dataListHandler)} />

            <ResponseApi {...createApiResultProps(api)} />
        </div>
    );
};

export default SimpleApiDemo;
