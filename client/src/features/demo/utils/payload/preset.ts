import { Entity, PayloadOf } from "../../const/const";
import { defaultPayloadFor } from "./default";

const today = () => new Date().toISOString().slice(0, 10);

export const SAMPLE_PRESETS: {
    [K in Entity]: Array<{ label: string; payload: Partial<PayloadOf<K>> }>;
} = {
    tasks: [
        {
            label: "タスク(最小)",
            payload: {
                name: "Sample Task",
                project_id: 1,
                phase_id: 1,
                category_id: 1,
                user_id: 1,
                planned_start_date: today(),
                planned_end_date: today(),
                status_id: 1,
            },
        },
        { label: "タスク(フル)", payload: defaultPayloadFor("tasks") },
    ],
    users: [
        {
            label: "ユーザー(最小)",
            payload: {
                name: "sample-user",
                password: "password",
                role: "user",
            },
        },
    ],
    categories: [{ label: "カテゴリ(例)", payload: { name: "Design" } }],
    projects: [
        {
            label: "プロジェクト(例)",
            payload: {
                name: "Sample Project",
                start_date: today(),
                end_date: today(),
            },
        },
    ],
    phases: [{ label: "フェーズ(例)", payload: { name: "Analysis", sort_no: 0 } }],
    statuses: [{ label: "ステータス(例)", payload: { name: "Open", color: "#ff0000" } }],
};