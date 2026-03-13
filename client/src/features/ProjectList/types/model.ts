import { ProjectPayload } from "../../../api/tauri/projectApi";
import { ProjectRow, ProjectStatus } from "../../../types/db/project";

export type Project = {
    id: string;
    name: string;
    client: string;
    status: ProjectStatus;
    startDate: string;
    endDate: string;
    progress: number;
};

export type ProjectSearchCondition = {
    name: string;
    client: string;
    status: ProjectStatus; // All を含む
};

export const toProject = (row: ProjectRow): Project => ({
    id: row.id,
    name: row.name,
    client: row.client,
    status: row.status,
    startDate: row.start_date,
    endDate: row.end_date,
    // 進捗は別集計でもいいが、今は 0 でプレースホルダ
    progress: 0,
});

export const toProjectPayload = (param: Project): ProjectPayload => (
    {
        id: param.id,
        name: param.name,
        client: param.client,
        status: param.status,
        start_date: param.startDate,
        end_date: param.endDate,
    }
)

export const statusToLabel = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.All:
            return "";
        case ProjectStatus.Planned:
            return "計画中";
        case ProjectStatus.Active:
            return "実行中";
        case ProjectStatus.Closed:
            return "完工";
        default:
            return "";
    }
};
