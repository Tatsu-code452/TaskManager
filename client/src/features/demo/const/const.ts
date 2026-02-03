import Task from "../../../types/task.interface"
import User from "../../../types/user.interface"
import Category from "../../../types/category.interface"
import Project from "../../../types/project.interface"
import Phase from "../../../types/phase.interface"
import Status from "../../../types/status.interface"

// payloadマッピング
export type EntityPayloadMap = {
    tasks: Task;
    users: User;
    projects: Project;
    categories: Category;
    phases: Phase;
    statuses: Status;
};

// Entity 型（自動生成）
export type Entity = keyof EntityPayloadMap;

// ===============================
// Entity → Label
// ===============================
export const ENTITY_LABELS: Record<Entity, string> = {
    tasks: "Tasks",
    users: "Users",
    categories: "Categories",
    projects: "Projects",
    phases: "Phases",
    statuses: "Statuses",
};

// UI 用の配列
export const ENTITIES = (Object.keys(ENTITY_LABELS) as Entity[]).map((key) => ({
    key,
    label: ENTITY_LABELS[key],
}));

// ===============================
// PayloadOf（Partial で Input 型を吸収）
// ===============================
export type PayloadOf<E extends Entity> = Partial<EntityPayloadMap[E]>;

// ===============================
// その他
// ===============================
export const TOKEN_API_URL = "/api/session";

export type DataItem = {
    id: string | number;
} & Record<string, unknown>;
