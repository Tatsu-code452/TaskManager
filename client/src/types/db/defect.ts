import { Tag, Timestamps } from "./common";

export enum DefectStatus {
    Open = "Open",       // 登録
    InProgress = "InProgress", // 修正中
    Fixed = "Fixed",      // 修正完了
    Verified = "Verified",   // 確認完了
    Closed = "Closed",     // 完全クローズ
}

export enum DefectSeverity {
    Minor = "Minor",
    Major = "Major",
    Critical = "Critical",
    Blocker = "Blocker",
}


export type DefectKey = {
    id: string,
    project_id: string,
};

export type DefectValue = {
    task_id: string,
    title: string,
    description: string,
    severity: DefectSeverity,
    status: DefectStatus,
    owner: string,
    reviewer: string,
    due_date: string,
    fixed_date: string,
    verified_date: string,
    tags: Tag[],
    timestamps: Timestamps,
};

// Row = Key + Value
export type DefectRow = DefectKey & DefectValue;
export type DefectPayload = DefectKey & Partial<DefectValue>;

export const toDefectPayload = (param: DefectRow): DefectPayload => (
    {
        id: param.id,
        project_id: param.project_id,
        task_id: param.task_id,
        title: param.title,
        description: param.description,
        severity: param.severity,
        status: param.status,
        owner: param.owner,
        reviewer: param.reviewer,
        due_date: param.due_date,
        fixed_date: param.fixed_date,
        verified_date: param.verified_date,
        tags: param.tags,
    }
)
