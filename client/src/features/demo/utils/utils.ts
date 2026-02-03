import { Entity, PayloadOf } from "../const/const";

// ID を数値変換
/**
 * IDを数値型に変換する
 * @param id 変換対象のID（string|number|null|undefined）
 * @returns number型IDまたはundefined
 */
export const toNumberId = (id: string | number | null | undefined): number | undefined => {
    if (id == null || id === "") return undefined;
    const num = typeof id === "number" ? id : parseInt(String(id), 10);
    return Number.isNaN(num) ? undefined : num;
};

// 安全 JSON パース
/**
 * 安全にJSONパースする（例外時undefined返却）
 * @param str JSON文字列
 * @param onError エラー時コールバック
 * @returns パース結果またはundefined
 */
export const parseJsonSafe = <T = any>(str: string, onError?: (msg: string) => void): T | undefined => {
    try {
        return JSON.parse(str) as T;
    } catch (e: any) {
        if (onError) onError(e?.message ?? String(e));
        return undefined;
    }
};

// ID の妥当性チェック
/**
 * IDの妥当性チェック
 * @param v 任意値
 */
export const isValidId = (v: unknown): boolean => {
    const n = toNumberId(v as any);
    return typeof n === "number" && !Number.isNaN(n);
};

// ===============================
// 型安全 parsePayload
// ===============================
/**
 * 型安全なPayload生成
 * @param idStr ID文字列
 * @param nameStr 名称文字列
 * @param payloadJson JSON文字列
 * @param entity Entity種別
 * @returns PayloadOf<E>
 */
export const parsePayload = <E extends Entity>(
    idStr: string,
    nameStr: string,
    payloadJson: string,
    entity: E
): PayloadOf<E> => {
    const idNum = toNumberId(idStr);

    // ① JSON があればそれをベースにする
    const base: PayloadOf<E> =
        payloadJson.trim()
            ? (() => {
                  const parsed = parseJsonSafe<PayloadOf<E>>(payloadJson);
                  if (!parsed) throw new Error("Invalid JSON payload");
                  return parsed;
              })()
            : defaultPayloadFor(entity);

    // ② UI の入力で上書き（共通処理）
    return {
        ...base,
        id: idNum ?? base.id,
        name: nameStr || base.name,
    };
};

// ===============================
// 型安全 defaultPayloadFor
// ===============================
/**
 * Entity種別ごとのデフォルトPayload生成
 * @param entityKey Entity種別
 * @param id 任意ID
 * @param name 任意名称
 * @returns PayloadOf<E>
 */
export const defaultPayloadFor = <E extends Entity>(
    entityKey: E,
    id?: number | null,
    name?: string
): PayloadOf<E> => {
    const idNum = toNumberId(id as any);

    switch (entityKey) {
        case "tasks":
            return {
                id: idNum ?? Date.now() % 100000,
                name: name || `task-${Date.now()}`,
                project_id: 1,
                phase_id: 1,
                category_id: 1,
                user_id: 1,
                planned_start_date: new Date().toISOString().slice(0, 10),
                planned_end_date: new Date().toISOString().slice(0, 10),
                planned_effort: 0,
                actual_effort: 0,
                status_id: 1,
                progress_rate: 0,
                priority: 1,
                pre_task_id: null,
                next_task_id: null,
            } as PayloadOf<E>;

        case "users":
            return {
                id: idNum ?? Date.now() % 100000,
                name: name || `user-${Date.now()}`,
                password: "password",
                role: "user",
                created_at: "",
                updated_at: "",
            } as PayloadOf<E>;

        case "categories":
            return {
                id: idNum ?? Date.now() % 100000,
                name: name || `category-${Date.now()}`,
            } as PayloadOf<E>;

        case "projects":
            return {
                id: idNum ?? Date.now() % 100000,
                name: name || `project-${Date.now()}`,
                start_date: new Date().toISOString().slice(0, 10),
                end_date: new Date().toISOString().slice(0, 10),
            } as PayloadOf<E>;

        case "phases":
            return {
                id: idNum ?? Date.now() % 100000,
                name: name || `phase-${Date.now()}`,
                sort_no: 0,
            } as PayloadOf<E>;

        case "statuses":
            return {
                id: idNum ?? Date.now() % 100000,
                name: name || `status-${Date.now()}`,
                color: "#000000",
            } as PayloadOf<E>;

        default:
            return { id: idNum ?? undefined, name } as PayloadOf<E>;
    }
};

// ===============================
// SAMPLE_PRESETS（型安全化）
// ===============================
export const SAMPLE_PRESETS: {
    [K in Entity]: Array<{ label: string; payload: Partial<PayloadOf<K>> }>
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