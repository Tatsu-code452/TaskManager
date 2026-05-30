import { IssuePayload, IssuePriority, IssueRow, IssueStatus } from "@comtypes/db/issue";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useIssueStates } from "@features/ProjectDetail/component/Issue/hooks/state/useIssueStates";

export type States = ReturnType<typeof useIssueStates>;
export type PageState = States["issue"];
export type ModalState = States["modal"];
export type Api = ReturnType<typeof useApiWithProjectId<IssueRow, IssuePayload>>;

export const IssueStatusLabel: Record<IssueStatus, string> = {
    [IssueStatus.Open]: "未対応",
    [IssueStatus.InProgress]: "対応中",
    [IssueStatus.Review]: "確認中",
    [IssueStatus.Resolved]: "解決済み",
    [IssueStatus.Closed]: "完了",
};

export const IssuePriorityLabel: Record<IssuePriority, string> = {
    [IssuePriority.Low]: "軽微",
    [IssuePriority.Medium]: "中程度",
    [IssuePriority.High]: "重大",
    [IssuePriority.Critical]: "致命的",
};
