import { taskApi } from "@api/taskApi";
import { InitPayload } from "@comtypes/db/task";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useTaskModalController } from "@features/ProjectDetail/component/Task/hooks/controller/useTaskModalController";
import { useTaskPageController } from "@features/ProjectDetail/component/Task/hooks/controller/useTaskPageController";
import { useTaskStates } from "@features/ProjectDetail/component/Task/hooks/state/useTaskStates";

export const useTaskController = (projectId: string) => {
    const states = useTaskStates();

    const api = useApiWithProjectId(projectId, taskApi);

    const modalDispatch = useTaskModalController(
        states.tasks,
        states.modal,
        api,
        InitPayload(projectId),
    );

    const pageDispatch = useTaskPageController(states.tasks, api);

    return {
        pageDispatch,
        modalDispatch,
    };
};
