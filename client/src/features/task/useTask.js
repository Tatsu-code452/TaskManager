import { useState, useCallback } from "react";
import { fetchApiWithLock, formatDate } from "../../module/fetchModule";

const columns = [
    { key: "projectName", label: "案件名" },
    { key: "phaseName", label: "フェーズ名" },
    { key: "taskId", label: "タスクID" },
    { key: "title", label: "タスク名" },
    { key: "status", label: "ステータス" },
    { key: "assignee", label: "担当者" },
    { key: "category", label: "カテゴリ" },
    { key: "startDate", label: "開始日", format: (d) => formatDate(d, false) },
    { key: "endDate", label: "終了日", format: (d) => formatDate(d, false) },
    { key: "workload", label: "工数" },
    { key: "description", label: "説明" },
    {
        key: "createDate",
        label: "作成日時",
        format: (d) => formatDate(d, false),
    },
    {
        key: "updateDate",
        label: "更新日時",
        format: (d) => formatDate(d, false),
    },
];

// --- API操作の共通関数 ---
const apiActions = {
    create: (form) => fetchApiWithLock("POST", "/tasks", { data: form }),
    edit: (form) =>
        fetchApiWithLock("PUT", `/tasks/${form.id}`, { data: form }),
    delete: (id) => fetchApiWithLock("DELETE", `/tasks/${id}`),
    fetch: () => fetchApiWithLock("GET", "/tasks"),
};

const useTask = () => {
    const [data, setData] = useState([]);

    // データの取得
    const fetchData = useCallback(async () => {
        try {
            const result = await apiActions.fetch();
            setData(result.data || []);
        } catch (error) {
            console.error("データ取得エラー:", error);
        }
    }, []);

    return { data, columns, fetchData };
};

export default useTask;
