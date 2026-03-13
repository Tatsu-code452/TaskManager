import { PhasePayload } from "../../../api/tauri/phaseApi";
import { PhaseRow } from "../../../types/db/phase";

export interface Phase {
    id: string,
    projectId: string;
    name: string,
    order: number,
    inputs: string[],
    outputs: string[],
}

export const toPhase = (param: PhaseRow): Phase => (
    {
        id: param.id,
        projectId: param.project_id,
        name: param.name,
        order: param.order,
        inputs: param.inputs,
        outputs: param.outputs,
    }
)

export const toPhaseRow = (param: Phase): PhaseRow => (
    {
        id: param.id,
        project_id: param.projectId,
        name: param.name,
        order: param.order,
        inputs: param.inputs,
        outputs: param.outputs,
        timestamps: {
            created_at: "",
            updated_at: ""
        }
    }
)

export const toPhasePayload = (param: Phase): PhasePayload => (
    {
        id: param.id,
        project_id: param.projectId,
        name: param.name,
        order: param.order,
        inputs: param.inputs,
        outputs: param.outputs,
    }
)