import { MilestonePayload, MilestoneRow, MilestoneStatus } from "@comtypes/db/milestone"
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId"
import { useMilestoneStates } from "@features/ProjectDetail/component/Milestone/hooks/state/useMilestoneStates"

export const MilestoneStatusLabel: Record<MilestoneStatus, string> = {
    [MilestoneStatus.NotStarted]: "未着手",
    [MilestoneStatus.InProgress]: "対応中",
    [MilestoneStatus.Completed]: "完了",
    [MilestoneStatus.Archived]: "アーカイブ済み",
}

export const InitPayload = (project_id: string): MilestonePayload => (
    {
        id: "",
        project_id,
        title: "",
        description: "",
        status: MilestoneStatus.NotStarted,
        progress: 0,
        start_date: "",
        end_date: "",
        owner: "",
    }
)

export type States = ReturnType<typeof useMilestoneStates>;
export type PageState = States["milestones"];
export type ModalState = States["modal"];
export type Api = ReturnType<typeof useApiWithProjectId<MilestoneRow, MilestonePayload>>;