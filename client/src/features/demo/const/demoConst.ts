export const ENTITIES = [
    { key: "tasks", label: "Tasks" },
    { key: "users", label: "Users" },
    { key: "categories", label: "Categories" },
    { key: "projects", label: "Projects" },
    { key: "phases", label: "Phases" },
    { key: "statuses", label: "Statuses" },
];

export type Entity =
    | "tasks"
    | "users"
    | "projects"
    | "categories"
    | "phases"
    | "statuses";

export const TOKEN_API_URL = "/api/session";