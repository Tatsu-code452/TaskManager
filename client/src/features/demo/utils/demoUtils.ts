// IDを数値変換する。変換できない場合はundefinedを返す。
export const toNumberId = (id: string | number | null | undefined): number | undefined => {
    if (id == null || id === "") return undefined;
    const num = typeof id === "number" ? id : parseInt(String(id), 10);
    return Number.isNaN(num) ? undefined : num;
};

// 安全にJSON文字列をパースする。エラー時はundefinedを返す。
export const parseJsonSafe = <T = any>(str: string, onError?: (msg: string) => void): T | undefined => {
    try {
        return JSON.parse(str) as T;
    } catch (e: any) {
        if (onError) onError(e?.message ?? String(e));
        return undefined;
    }
};

// 有効なIDかどうかを判定する。
export const isValidId = (v: unknown): boolean => {
    const n = toNumberId(v as any);
    return typeof n === "number" && !Number.isNaN(n);
};

// ペイロードを解析または生成
export const parsePayload = (idStr: string, nameStr: string, payloadJson: string, entity: string) => {
    if (payloadJson.trim()) {
        const parsed = parseJsonSafe(payloadJson);
        if (parsed === undefined) throw new Error("Invalid JSON payload");
        return parsed;
    }
    const idNum = toNumberId(idStr);
    return defaultPayloadFor(entity, idNum, nameStr || undefined);
};

// デフォルトペイロード生成
export const defaultPayloadFor = (
    entityKey: string,
    id?: number | null,
    name?: string
) => {
    const idNum = toNumberId(id as any);
    switch (entityKey) {
        case "tasks":
            return {
                id: idNum ?? new Date().getTime() % 100000,
                name: name || `task-${Date.now()}`,
                project_id: 1,
                phase_id: 1,
                category_id: 1,
                user_id: 1,
                planned_start_date: new Date().toISOString().slice(0, 10),
                planned_end_date: new Date().toISOString().slice(0, 10),
                planned_effort: 0,
                status_id: 1,
                progress_rate: 0,
                priority: 1,
            };
        case "users":
            return {
                id: idNum ?? new Date().getTime() % 100000,
                name: name || `user-${Date.now()}`,
                password: "password",
                role: "user",
            };
        case "categories":
            return {
                id: idNum ?? new Date().getTime() % 100000,
                name: name || `category-${Date.now()}`,
            };
        case "projects":
            return {
                id: idNum ?? new Date().getTime() % 100000,
                name: name || `project-${Date.now()}`,
                start_date: new Date().toISOString().slice(0, 10),
                end_date: new Date().toISOString().slice(0, 10),
            };
        case "phases":
            return {
                id: idNum ?? new Date().getTime() % 100000,
                name: name || `phase-${Date.now()}`,
                sort_no: 0,
            };
        case "statuses":
            return {
                id: idNum ?? new Date().getTime() % 100000,
                name: name || `status-${Date.now()}`,
                color: "#000000",
            };
        default:
            return { id: idNum ?? undefined, name };
    }
};

export const SAMPLE_PRESETS: Record<
    string,
    Array<{ label: string; payload: any }>
> = {
    tasks: [
        {
            label: "タスク(最小)",
            payload: {
                name: "Sample Task",
                project_id: 1,
                phase_id: 1,
                category_id: 1,
                user_id: 1,
                planned_start_date: new Date().toISOString().slice(0, 10),
                planned_end_date: new Date().toISOString().slice(0, 10),
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
                start_date: new Date().toISOString().slice(0, 10),
                end_date: new Date().toISOString().slice(0, 10),
            },
        },
    ],
    phases: [
        {
            label: "フェーズ(例)",
            payload: { name: "Analysis", sort_no: 0 },
        },
    ],
    statuses: [
        {
            label: "ステータス(例)",
            payload: { name: "Open", color: "#ff0000" },
        },
    ],
};
