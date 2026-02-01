import Task from "../../../types/task.interface"
import User from "../../../types/user.interface"
import Category from "../../../types/category.interface"
import Project from "../../../types/project.interface"
import Phase from "../../../types/phase.interface"
import Status from "../../../types/status.interface"

// Entity定義
export const ENTITIES = [
    { key: "tasks", label: "Tasks" },
    { key: "users", label: "Users" },
    { key: "categories", label: "Categories" },
    { key: "projects", label: "Projects" },
    { key: "phases", label: "Phases" },
    { key: "statuses", label: "Statuses" },
] as const;


export type Entity = typeof ENTITIES[number]["key"];

// payloadマッピング
export type EntityPayloadMap = {
    tasks: Task;
    users: User;
    projects: Project;
    categories: Category;
    phases: Phase;
    statuses: Status;
};

export type PayloadOf<E extends Entity> = EntityPayloadMap[E];

export const TOKEN_API_URL = "/api/session";

export type DataItem = {
    id: string | number;
} & Record<string, unknown>;

