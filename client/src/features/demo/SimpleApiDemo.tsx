import React from "react";

import "./SimpleApiDemo.css";

import { useStates } from "./hooks/useStates";

import Login from "./ui/Login";
import Token from "./ui/Token";
import DataFetch from "./ui/list/DataFetch";
import DataCreatePreset from "./ui/edit/DataCreatePreset";
import DataCreateFormInput from "./ui/edit/DataCreateFormInput";
import DataCreateForm from "./ui/edit/DataCreateForm";
import DataEdit from "./ui/edit/DataEdit";
import DataList from "./ui/list/DataList";
import ResponseApi from "./ui/ResponseApi";
import { createLoginProps } from "./ui/propsCreators/createLoginProps";
import { createTokenProps } from "./ui/propsCreators/createTokenProps";
import { createDataFetchProps } from "./ui/propsCreators/createDataFetchProps";
import {
    createDataCreateFormInputProps,
    createDataCreateFormProps,
    createDataCreatePresetProps,
} from "./ui/propsCreators/createDataCreateProps";
import { createDataEditProps } from "./ui/propsCreators/createDataEditProps";
import { createDataListProps } from "./ui/propsCreators/createDataListProps";
import { createApiResultProps } from "./ui/propsCreators/createApiResultProps";

const SimpleApiDemo: React.FC = () => {
    const { auth, api, crud } = useStates();
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
