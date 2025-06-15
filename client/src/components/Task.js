import React, { useState, useEffect } from "react";
import useScreenTitle from "./useScreenTitle";
import { fetchApiWithLock, formatDate } from "../module/fetchModule";
import DataTable from "./parts/DataTable";
import useSessionCheck from "./useSessionCheck";

function Task() {
    useSessionCheck();
    useScreenTitle("タスク一覧");
    const [data, setData] = useState([]);

    // タスク一覧のデータを取得
    useEffect(() => {
        (async () => {
            try {
                const data = await fetchApiWithLock("GET", "/tasks");
                setData(data || []);
            } catch (error) {
                console.error("タスクの取得中にエラーが発生しました:", error);
                alert("タスクの取得中にエラーが発生しました");
            }
        })();
    }, []);

    const columns = [
        { key: "projectName", label: "案件名" },
        { key: "phaseName", label: "フェーズ名" },
        { key: "taskId", label: "タスクID" },
        { key: "title", label: "タスク名" },
        { key: "status", label: "ステータス" },
        { key: "assignee", label: "担当者" },
        { key: "category", label: "カテゴリ" },
        { key: "startDate", label: "開始日", format: formatDate },
        { key: "endDate", label: "終了日", format: formatDate },
        { key: "workload", label: "工数" },
        { key: "description", label: "説明" },
        {
            key: "createDate",
            label: "作成日時",
            format: (d) => formatDate(d, true),
        },
        {
            key: "updateDate",
            label: "更新日時",
            format: (d) => formatDate(d, true),
        },
    ];

    return (
        <div className="row justify-content-center">
            <div className="overflow-scroll col-md-12 border border-2 rounded p-3">
                <DataTable columns={columns} data={data} rowKey="taskId" />
            </div>
        </div>
    );
}

export default Task;
