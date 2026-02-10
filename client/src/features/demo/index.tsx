import React from "react";

import "./index.css";

import DataCreate from "./DataCreate";
import { createDataCreateProps } from "./DataCreate/factory";
import DataEdit from "./DataEdit";
import { createDataEditProps } from "./DataEdit/factory";
import DataFetch from "./DataFetch";
import { createDataFetchProps } from "./DataFetch/factory";
import DataList from "./DataList";
import { createDataListProps } from "./DataList/factory";
import Login from "./Login";
import { createLoginProps } from "./Login/factory";
import ResponseApi from "./ResponseApi";
import { createApiResultProps } from "./ResponseApi/factory";
import Token from "./Token";
import { createTokenProps } from "./Token/factory";
import { useSimpleApiDemo } from "./factory";

const SimpleApiDemo: React.FC = () => {
    const { props } = useSimpleApiDemo();

    return (
        <div className="demo-container">
            <h2 className="demo-title">簡易APIデモ画面</h2>
            <Login {...createLoginProps(props.auth, props.loginHandler)} />
            <hr />

            <Token {...createTokenProps(props.auth, props.tokenHandler)} />
            <hr />

            <h3>汎用 CRUD デモ</h3>

            <DataFetch
                {...createDataFetchProps(props.crud, props.dataFetchHandler)}
            />

            <DataCreate
                {...createDataCreateProps(
                    props.crud,
                    props.dataCreateFormHandler,
                )}
            />

            <DataEdit
                {...createDataEditProps(props.crud, props.dataEditHandler)}
            />

            <DataList
                {...createDataListProps(props.crud, props.dataListHandler)}
            />

            <ResponseApi {...createApiResultProps(props.api)} />
        </div>
    );
};

export default SimpleApiDemo;
