import Task from "../../../../types/task.interface"
import User from "../../../../types/user.interface"
import Category from "../../../../types/category.interface"
import Project from "../../../../types/project.interface"
import Phase from "../../../../types/phase.interface"
import Status from "../../../../types/status.interface"

import { Entity, PayloadOf } from "../../const/const";
import { toNumberId } from "../id";

const today = () => new Date().toISOString().slice(0, 10);
const genId = () => Date.now() % 100000;

// --- Entity ごとの defaultPayload ---
const defaultTasks = (): Partial<Task> => ({
    id: genId(),
    name: `task-${Date.now()}`,
    project_id: 1,
    phase_id: 1,
    category_id: 1,
    user_id: 1,
    planned_start_date: today(),
    planned_end_date: today(),
    planned_effort: 0,
    actual_effort: 0,
    status_id: 1,
    progress_rate: 0,
    priority: 1,
    pre_task_id: null,
    next_task_id: null,
    // ★ created_at / updated_at / actual_start_date / actual_end_date は入れない
});

const defaultUsers = (): Partial<User> => ({
    id: genId(),
    name: `user-${Date.now()}`,
    password: "password",
    role: "user",
});

const defaultCategories = (): Partial<Category> => ({
    id: genId(),
    name: `category-${Date.now()}`,
});

const defaultProjects = (): Partial<Project> => ({
    id: genId(),
    name: `project-${Date.now()}`,
    start_date: today(),
    end_date: today(),
});

const defaultPhases = (): Partial<Phase> => ({
    id: genId(),
    name: `phase-${Date.now()}`,
    sort_no: 0,
});

const defaultStatuses = (): Partial<Status> => ({
    id: genId(),
    name: `status-${Date.now()}`,
    color: "#000000",
});

// --- マップ化 ---
const defaultPayloadMap = {
    tasks: defaultTasks,
    users: defaultUsers,
    categories: defaultCategories,
    projects: defaultProjects,
    phases: defaultPhases,
    statuses: defaultStatuses,
} satisfies Record<Entity, () => any>;

/**
 * Entity ごとのデフォルト Payload を生成
 */
export const defaultPayloadFor = <E extends Entity>(
    entity: E,
    id?: number | null,
    name?: string
): PayloadOf<E> => {
    const base = defaultPayloadMap[entity]() as PayloadOf<E>;
    const idNum = toNumberId(id);

    return {
        ...base,
        id: idNum ?? base.id,
        name: name ?? base.name,
    };
};