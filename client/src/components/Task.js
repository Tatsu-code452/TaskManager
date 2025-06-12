import React, { useState, useEffect } from "react";
import useScreenTitle from "./useScreenTitle";

function Task() {
    useScreenTitle("タスク一覧");
    const [tasks, setTasks] = useState([]);

    // 日付フォーマット関数
    const formatDate = (date, withTime = false) => {
        if (!date) return "";
        const d = new Date(date);
        return withTime ? d.toLocaleString() : d.toLocaleDateString();
    };

    // タスク一覧のデータを取得
    const fetchTasks = async () => {
        try {
            const response = await fetch("/tasks", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("ネットワークエラー: " + response.statusText);
            }
            const data = await response.json();
            setTasks(data.tasks || []);
        } catch (error) {
            console.error("タスクの取得中にエラーが発生しました:", error);
            alert("タスクの取得中にエラーが発生しました");
        }
    };

    useEffect(() => {
        fetchTasks();
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
        { key: "createDate", label: "作成日時", format: (d) => formatDate(d, true) },
        { key: "updateDate", label: "更新日時", format: (d) => formatDate(d, true) },
    ];

    return (
        <div className="row justify-content-center">
            <h2 className="mb-4 text-center">タスク一覧</h2>
            <div className="overflow-scroll col-md-12 border border-2 rounded p-3">
                <table className="table table-striped table-bordered">
                    <thead className="table-primary">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.taskId}>
                                {columns.map((col) => (
                                    <td key={col.key}>
                                        {col.format ? col.format(task[col.key]) : task[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Task;
