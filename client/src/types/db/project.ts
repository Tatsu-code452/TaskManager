import { Timestamps } from "./common";

export enum ProjectStatus {
    Planned = "Planned",   // 計画中
    Active = "Active",    // 進行中
    OnHold = "OnHold",   // 一時停止
    Completed = "Completed", // 完了
    Archived = "Archived",  // アーカイブ
}

export type ProjectKey = {
    id: string,
}

export type ProjectValue = {
    name: string,
    client: string,
    description: string,
    status: ProjectStatus,
    start_date?: string,
    end_date?: string,
    owner: string,
    timestamps: Timestamps;
}

export type ProjectRow = ProjectKey & ProjectValue;
export type ProjectPayload = ProjectKey & Partial<ProjectValue>;

export const toProjectPayload = (param: ProjectRow): ProjectPayload => (
    {
        id: param.id,
        name: param.name,
        client: param.client,
        description: param.description,
        status: param.status,
        start_date: param.start_date,
        end_date: param.end_date,
        owner: param.owner,
    }
)
