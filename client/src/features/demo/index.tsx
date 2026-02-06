import React from "react";

import "./index.css";

import { useAuthState } from "./hooks/auth/useAuthState";
import { useApiState } from "./hooks/api/useApiState";
import { useEntityState } from "./hooks/entity/useEntityState";

import Login from "./Login";
import { createLoginProps } from "./Login/factory";
import Token from "./Token";
import { createTokenProps } from "./Token/factory";
import DataFetch from "./DataFetch";
import { createDataFetchProps } from "./DataFetch/factory";
import DataCreatePreset from "./DataCreatePreset";
import { createDataCreatePresetProps } from "./DataCreatePreset/factory";
import DataCreateFormInput from "./DataCreateFormInput";
import { createDataCreateFormInputProps } from "./DataCreateFormInput/factory";
import DataCreateForm from "./DataCreateForm";
import { createDataCreateFormProps } from "./DataCreateForm/factory";
import DataEdit from "./DataEdit";
import { createDataEditProps } from "./DataEdit/factory";
import DataList from "./DataList";
import { createDataListProps } from "./DataList/factory";
import ResponseApi from "./ResponseApi";
import { createApiResultProps } from "./ResponseApi/factory";

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

    return (
        <div className="demo-container">
            <h2 className="demo-title">簡易APIデモ画面</h2>
            <Login {...createLoginProps(auth)} />
            <hr />

            <Token {...createTokenProps(auth)} />
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
