import { DefectPayload, DefectRow, DefectSeverity, DefectStatus } from "@comtypes/db/defect";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useDefectStates } from "@features/ProjectDetail/component/Defect/hooks/state/useDefectStates";

export type States = ReturnType<typeof useDefectStates>;
export type PageState = States["defect"];
export type ModalState = States["modal"];
export type Api = ReturnType<typeof useApiWithProjectId<DefectRow, DefectPayload>>;

export const DefectStatusLabel: Record<DefectStatus, string> = {
    [DefectStatus.Open]: "未対応",
    [DefectStatus.InProgress]: "対応中",
    [DefectStatus.Fixed]: "修正済み",
    [DefectStatus.Verified]: "確認中",
    [DefectStatus.Closed]: "完了",
};

export const DefectSeverityLabel: Record<DefectSeverity, string> = {
    [DefectSeverity.Minor]: "軽微",
    [DefectSeverity.Major]: "重大",
    [DefectSeverity.Critical]: "致命的",
    [DefectSeverity.Blocker]: "ブロック",
};
