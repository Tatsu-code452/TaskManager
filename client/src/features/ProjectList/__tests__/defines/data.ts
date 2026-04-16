import { ProjectRow, ProjectStatus } from "../../../../types/db/project";

export const initialList: ProjectRow[] = [
    {
        id: "PJT-001",
        name: "販売管理システム刷新",
        client: "ABC商事",
        description: "",
        status: ProjectStatus.Active,
        start_date: "2025-01-10",
        end_date: "2025-09-30",
        owner: "佐藤太郎",
        timestamps: {
            created_at: "",
            updated_at: "",
        },
    },
];
export const filteredList: ProjectRow[] = [
    {
        id: "PJT-999",
        name: "販売管理システム（改修）",
        client: "XYZ商事",
        description: "",
        status: ProjectStatus.Planned,
        start_date: "2025-03-01",
        end_date: "2025-05-01",
        owner: "山田太郎",
        timestamps: {
            created_at: "",
            updated_at: "",
        },
    },
];
