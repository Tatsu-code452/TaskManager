import React from "react";

import "./index.css";

import { useApiState } from "./hooks/api/useApiState";
import { useAuthState } from "./hooks/auth/useAuthState";
import { useEntityState } from "./hooks/entity/useEntityState";

import DataCreateForm from "./DataCreateForm";
import { createDataCreateFormProps } from "./DataCreateForm/factory";
import DataCreateFormInput from "./DataCreateFormInput";
import { createDataCreateFormInputProps } from "./DataCreateFormInput/factory";
import DataCreatePreset from "./DataCreatePreset";
import { createDataCreatePresetProps } from "./DataCreatePreset/factory";
import DataEdit from "./DataEdit";
import { createDataEditProps } from "./DataEdit/factory";
import DataFetch from "./DataFetch";
import { createDataFetchProps } from "./DataFetch/factory";
import DataList from "./DataList";
import { createDataListProps } from "./DataList/factory";
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

    const dataCreateChildren = (
        <>
            <div className="form-row">
                <DataCreateFormInput
                    {...createDataCreateFormInputProps(crud)}
                />
            </div>

            <div className="form-row">
                <DataCreatePreset {...createDataCreatePresetProps(crud)} />
            </div>

            <div className="form-row">
                <DataCreateForm {...createDataCreateFormProps(crud, api)} />
            </div>
        </>
    );

    const tokenHandler = useTokenHandler({
        setCsrfToken: auth.setCsrfToken,
    });

    const loginHandler = useLoginHandler({
        username: auth.username,
        password: auth.password,
        setLoginResult: auth.setLoginResult,
        onFetchToken: tokenHandler.onFetchToken,
    });

    return (
        <div className="demo-container">
            <h2 className="demo-title">簡易APIデモ画面</h2>
            <Login {...createLoginProps(auth, loginHandler)} />
            <hr />

            <Token {...createTokenProps(auth, tokenHandler)} />
            <hr />

            <h3>汎用 CRUD デモ</h3>

            <DataFetch {...createDataFetchProps(api, crud)} />

            {dataCreateChildren}

            <DataEdit {...createDataEditProps(crud, api)} />

            <DataList {...createDataListProps(crud, api)} />

            <ResponseApi {...createApiResultProps(api)} />
        </div>
    );
};

export default SimpleApiDemo;
