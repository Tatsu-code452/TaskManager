import { TaskPayload } from "../../../api/tauri/taskApi";
import { TaskRow, TaskStatus } from "../../../types/db/task";

export const statusToLabel = (status: TaskStatus): string => {
    switch (status) {
        case TaskStatus.NotStarted:
            return "未着手";
        case TaskStatus.InProgress:
            return "実施中";
        case TaskStatus.Done:
            return "完了";
        default:
            return "";
    }
};

export interface Task {
    id: string;
    projectId: string;
    phaseId: string,
    name: string,

    plannedStart: string,
    plannedEnd: string,
    actualStart: string,
    actualEnd: string,

    plannedHours: number,
    actualHours: number,
    progressRate: number,

    status: TaskStatus,
}

export const toTask = (param: TaskRow): Task => (
    {
        id: param.id,
        projectId: param.project_id,
        phaseId: param.phase_id,
        name: param.name,
        plannedStart: param.planned_start,
        plannedEnd: param.planned_end,
        actualStart: param.actual_start,
        actualEnd: param.actual_end,
        plannedHours: param.planned_hours,
        actualHours: param.actual_hours,
        progressRate: param.progress_rate,
        status: param.status,
    }
)

export const toTaskRow = (param: Task): TaskRow => (
    {
        id: param.id,
        project_id: param.projectId,
        phase_id: param.phaseId,
        name: param.name,
        planned_start: param.plannedStart,
        planned_end: param.plannedEnd,
        actual_start: param.actualStart,
        actual_end: param.actualEnd,
        planned_hours: param.plannedHours,
        actual_hours: param.actualHours,
        progress_rate: param.progressRate,
        status: param.status,
        timestamps: {
            created_at: "",
            updated_at: ""
        }
    }
)

export const toTaskPayload = (param: Task): TaskPayload => (
    {
        id: param.id,
        project_id: param.projectId,
        phase_id: param.phaseId,
        name: param.name,
        planned_start: param.plannedStart,
        planned_end: param.plannedEnd,
        actual_start: param.actualStart,
        actual_end: param.actualEnd,
        planned_hours: param.plannedHours,
        actual_hours: param.actualHours,
        progress_rate: param.progressRate,
        status: param.status,
    }
)