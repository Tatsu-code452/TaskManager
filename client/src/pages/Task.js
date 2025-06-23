import React, { useEffect } from "react";
import useScreenTitle from "../hooks/useScreenTitle";
import DataTable from "../components/parts/DataTable";
import useSessionCheck from "../hooks/useSessionCheck";
import useTask from "../features/task/useTask";

function Task() {
    useSessionCheck();
    useScreenTitle("タスク一覧");
    const { data, columns, fetchData } = useTask();

    // 初回マウント時にデータ取得
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="overflow-scroll col-md-12 border border-2 rounded p-3">
            <DataTable columns={columns} data={data} rowKey="taskId" />
        </div>
    );
}

export default Task;
