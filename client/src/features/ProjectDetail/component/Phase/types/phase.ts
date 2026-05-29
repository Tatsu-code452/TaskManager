import { PhasePayload, PhaseRow, PhaseStatus } from "@comtypes/db/phase";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { usePhaseStates } from "@features/ProjectDetail/component/Phase/hooks/state/usePhaseStates";

export const PhaseStatusLabel: Record<PhaseStatus, string> = {
    [PhaseStatus.NotStarted]: "未着手",
    [PhaseStatus.InProgress]: "対応中",
    [PhaseStatus.Completed]: "完了",
}

export const InitPayload = (project_id: string): PhasePayload => (
    {
        id: "",
        project_id,
        name: "",
        order: 1,
        status: PhaseStatus.NotStarted,
        start_date: "",
        end_date: "",
        inputs: [],
        outputs: [],
        owner: "",
    }
)

export type States = ReturnType<typeof usePhaseStates>;
export type PageState = States["phases"];
export type ModalState = States["modal"];
export type Api = ReturnType<typeof useApiWithProjectId<PhaseRow, PhasePayload>>;