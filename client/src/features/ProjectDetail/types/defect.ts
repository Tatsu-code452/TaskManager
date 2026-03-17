import { DefectPayload } from "../../../api/tauri/defectApi";
import { DefectRow, DefectSeverity, DefectStatus } from "../../../types/db/defect";

export const statusToLabel = (status: DefectStatus): string => {
    switch (status) {
        case DefectStatus.Open:
            return "未対応";
        case DefectStatus.Fixed:
            return "対応済み";
        case DefectStatus.Closed:
            return "完了";
        default:
            return "";
    }
};

export interface Defect {
    id: string;
    projectId: string;
    taskId: string,
    title: string,
    description: string,
    severity: DefectSeverity,
    status: DefectStatus,
}

export const toDefect = (param: DefectRow): Defect => (
    {
        id: param.id,
        projectId: param.project_id,
        taskId: param.task_id,
        title: param.title,
        description: param.description,
        severity: param.severity,
        status: param.status
    }
)

export const toDefectRow = (param: Defect): DefectRow => (
    {
        id: param.id,
        project_id: param.projectId,
        task_id: param.taskId,
        title: param.title,
        description: param.description,
        severity: param.severity,
        status: param.status,
        timestamps: {
            created_at: "",
            updated_at: ""
        }
    }
)

export const toDefectPayload = (param: Defect): DefectPayload => (
    {
        id: param.id,
        project_id: param.projectId,
        task_id: param.taskId,
        title: param.title,
        description: param.description,
        severity: param.severity,
        status: param.status
    }
)