import { MilestonePayload } from "../../../api/tauri/milestoneApi";
import { MilestoneRow, MilestoneStatus } from "../../../types/db/milestone";

export const statusToLabel = (status: MilestoneStatus): string => {
    switch (status) {
        case MilestoneStatus.NotStarted:
            return "未着手";
        case MilestoneStatus.InProgress:
            return "実施中";
        case MilestoneStatus.Done:
            return "完了";
        default:
            return "";
    }
};

export interface Milestone {
    id: string;
    projectId: string;
    name: string;
    plannedStartDate: string;
    plannedEndDate: string;
    actualStartDate: string;
    actualEndDate: string;
    status: MilestoneStatus;
}

export const toMilestone = (param: MilestoneRow): Milestone => (
    {
        id: param.id,
        projectId: param.project_id,
        name: param.name,
        plannedStartDate: param.planned_start_date,
        plannedEndDate: param.planned_end_date,
        actualStartDate: param.actual_start_date,
        actualEndDate: param.actual_end_date,
        status: param.status,
    }
)

export const toMilestoneRow = (param: Milestone): MilestoneRow => (
    {
        id: param.id,
        project_id: param.projectId,
        name: param.name,
        planned_start_date: param.plannedStartDate,
        planned_end_date: param.plannedEndDate,
        actual_start_date: param.actualStartDate,
        actual_end_date: param.actualEndDate,
        status: param.status,
        timestamps: {
            created_at: "",
            updated_at: ""
        }
    }
)

export const toMilestonePayload = (param: Milestone): MilestonePayload => (
    {
        id: param.id,
        project_id: param.projectId,
        name: param.name,
        planned_start_date: param.plannedStartDate,
        planned_end_date: param.plannedEndDate,
        actual_start_date: param.actualStartDate,
        actual_end_date: param.actualEndDate,
        status: param.status,
    }
)