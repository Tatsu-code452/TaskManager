import React, { useState } from "react";
import TaskList from "./TaskList";
import Task from "../../../types/task.interface";

const sampleTasks: Task[] = [
    {
        id: 1,
        name: "要件定義ミーティング",
        project_id: 1,
        phase_id: 1,
        category_id: 1,
        user_id: 10,
        planned_start_date: "2025-12-01T00:00:00Z",
        planned_end_date: "2025-12-03T00:00:00Z",
        planned_effort: 16,
        actual_start_date: "2025-12-01T08:00:00Z",
        actual_end_date: "",
        actual_effort: 4,
        status_id: 2,
        progress_rate: 25,
        priority: 7,
        pre_task_id: null,
        next_task_id: null,
        created_at: "2025-11-25T10:00:00Z",
        updated_at: "2025-11-26T12:00:00Z",
    },
    {
        id: 2,
        name: "設計レビュー",
        project_id: 1,
        phase_id: 2,
        category_id: 2,
        user_id: 11,
        planned_start_date: "2025-12-04T00:00:00Z",
        planned_end_date: "2025-12-05T00:00:00Z",
        planned_effort: 8,
        actual_start_date: "",
        actual_end_date: "",
        actual_effort: 0,
        status_id: 1,
        progress_rate: 0,
        priority: 9,
        pre_task_id: 1,
        next_task_id: null,
        created_at: "2025-11-20T09:00:00Z",
        updated_at: "2025-11-21T11:00:00Z",
    },
    {
        id: 3,
        name: "実装（ログイン）",
        project_id: 1,
        phase_id: 3,
        category_id: 3,
        user_id: 12,
        planned_start_date: "2025-12-06T00:00:00Z",
        planned_end_date: "2025-12-10T00:00:00Z",
        planned_effort: 40,
        actual_start_date: "",
        actual_end_date: "",
        actual_effort: 0,
        status_id: 1,
        progress_rate: 0,
        priority: 5,
        pre_task_id: 2,
        next_task_id: null,
        created_at: "2025-11-28T08:00:00Z",
        updated_at: "2025-11-28T08:00:00Z",
    },
];

const userMap: { [key: number]: string } = {
    10: "田中太郎",
    11: "鈴木次郎",
    12: "佐藤三郎",
};

const statusMap: { [key: number]: string } = {
    1: "未実施",
    2: "実施中",
    3: "完了",
};

const categoryMap: { [key: number]: string } = {
    1: "会議",
    2: "レビュー",
    3: "開発",
};

export default function TaskDemo() {
    const [tasks, setTasks] = useState<Task[]>(sampleTasks);

    const handleUpdate = (updated: Task) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === updated.id ? { ...t, ...updated, updated_at: new Date().toISOString() } : t))
        );
    };

    const handleDelete = (id: number) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div>
            <h2>タスク一覧デモ</h2>
            <TaskList
                tasks={tasks}
                userMap={userMap}
                statusMap={statusMap}
                categoryMap={categoryMap}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}
