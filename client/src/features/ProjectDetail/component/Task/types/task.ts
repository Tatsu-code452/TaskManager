import { TaskPayload, TaskRow, TaskStatus } from "@comtypes/db/task";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useTaskStates } from "@features/ProjectDetail/component/Task/hooks/state/useTaskStates";

export type States = ReturnType<typeof useTaskStates>;
export type PageState = States["tasks"];
export type ModalState = States["modal"];
export type Api = ReturnType<typeof useApiWithProjectId<TaskRow, TaskPayload>>;

export const TaskStatusLabel: Record<TaskStatus, string> = {
    [TaskStatus.NotStarted]: "未着手",
    [TaskStatus.InProgress]: "対応中",
    [TaskStatus.Done]: "完了",
}

