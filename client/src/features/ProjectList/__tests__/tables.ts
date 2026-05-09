import { ProjectRow, ProjectStatus } from "../../../types/db/project";

export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

const projectsDef: ProjectRow[] = [
    {
        id: "project-1",
        name: "プロジェクト1",
        client: "顧客1",
        description: "",
        status: ProjectStatus.Planned,
        start_date: "2024-01-01",
        end_date: "2024-06-30",
        owner: "担当者1",
        timestamps: {
            created_at: "2024-01-01",
            updated_at: "2024-01-01",
        },
    },
];

export const projects = projectsDef.map(v => clone(v));
