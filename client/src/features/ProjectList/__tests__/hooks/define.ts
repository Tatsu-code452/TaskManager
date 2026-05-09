import { ProjectPayload, ProjectSearchCondition, ProjectStatus } from "../../../../types/db/project";

export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

const payloadsDef = ({
    invalidEmpty: {
        id: "",
        name: "",
        client: "",
        status: ProjectStatus.All,
        start_date: "",
        end_date: "",
        owner: "",
    },
    invalidDate: {
        id: "1",
        name: "案件",
        client: "顧客",
        status: ProjectStatus.Planned,
        start_date: "2024-12-31",
        end_date: "2024-01-01",
        owner: "担当者",
    },
    valid: {
        id: "1",
        name: "案件",
        client: "顧客",
        status: ProjectStatus.Planned,
        start_date: "2024-01-01",
        end_date: "2024-12-31",
        owner: "担当者",
    },
    create: {
        id: "project-1",
        name: "プロジェクト1",
        client: "顧客1",
        status: ProjectStatus.Planned,
        start_date: "2024-01-01",
        end_date: "2024-06-30",
        owner: "担当者1",
    },
    update: {
        id: "project-1",
        name: "プロジェクト1",
        client: "顧客1",
        status: ProjectStatus.Active,
        start_date: "2024-01-01",
        end_date: "2024-06-30",
        owner: "担当者2",
    },
    empty: {
        id: "",
        name: "",
        client: "",
        description: "",
        status: ProjectStatus.Planned,
        start_date: "",
        end_date: "",
        owner: "",
    }
});

const searchConditionDef = ({
    allInput: {
        name: "プロジェクト1",
        client: "顧客1",
        status: ProjectStatus.Active
    },
})


export const payloads = Object.fromEntries(
    Object.entries(payloadsDef).map(([key, value]) => [key, clone(value)])
) as Record<keyof typeof payloadsDef, ProjectPayload>;

export const searchCondition = Object.fromEntries(
    Object.entries(searchConditionDef).map(([key, value]) => [key, clone(value)])
) as Record<keyof typeof searchConditionDef, ProjectSearchCondition>;