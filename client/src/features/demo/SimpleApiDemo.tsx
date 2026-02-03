import React from "react";

import "./SimpleApiDemo.css";

import { useAuthState } from "./hooks/auth/useAuthState";
import { useApiState } from "./hooks/api/useApiState";
import { useCrudState } from "./hooks/crud/useCrudState";

import Login, { createLoginProps } from "./ui/Login";
import Token, { createTokenProps } from "./ui/Token";
import DataFetch from "./ui/list/DataFetch";
import DataCreatePreset from "./ui/edit/DataCreatePreset";
import DataCreateFormInput from "./ui/edit/DataCreateFormInput";
import DataCreateForm from "./ui/edit/DataCreateForm";
import DataEdit from "./ui/edit/DataEdit";
import DataList from "./ui/list/DataList";
import ResponseApi, { createApiResultProps } from "./ui/ResponseApi";
import { createDataFetchProps } from "./ui/propsCreators/createDataFetchProps";
import {
    createDataCreateFormInputProps,
    createDataCreateFormProps,
    createDataCreatePresetProps,
} from "./ui/propsCreators/createDataCreateProps";
import { createDataEditProps } from "./ui/propsCreators/createDataEditProps";
import { createDataListProps } from "./ui/propsCreators/createDataListProps";

const SimpleApiDemo: React.FC = () => {
    const auth = useAuthState();
    const api = useApiState();
    const crud = useCrudState();

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
