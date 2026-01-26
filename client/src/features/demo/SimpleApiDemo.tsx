import React from "react";

import "./SimpleApiDemo.css";

import Login from "./components/Login";
import Token from "./components/Token";
import TableMaintenance from "./components/TableMaintenance";
import DataCreate from "./components/create/DataCreate";
import DataEdit from "./components/DataEdit";
import DataList from "./components/DataList";
import ResponseApi from "./components/ResponseApi";

import { useSimpleApiDemoProps } from "./hooks/useSimpleApiDemoProps";

const SimpleApiDemo: React.FC = () => {
    const {
        loginProps,
        tokenProps,
        tableMaintenanceProps,
        dataCreateProps,
        dataEditProps,
        dataListProps,
        apiResult,
    } = useSimpleApiDemoProps();

    return (
        <div className="demo-container">
            <h2 className="demo-title">簡易APIデモ画面</h2>
            <Login {...loginProps} />
            <hr />

            <Token {...tokenProps} />
            <hr />

            <h3>汎用 CRUD デモ</h3>

            <TableMaintenance {...tableMaintenanceProps} />

            <DataCreate {...dataCreateProps} />

            <DataEdit {...dataEditProps} />

            <DataList {...dataListProps} />

            <ResponseApi apiResult={apiResult} />
        </div>
    );
};

export default SimpleApiDemo;
