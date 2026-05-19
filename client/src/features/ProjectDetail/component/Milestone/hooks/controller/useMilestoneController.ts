import { milestoneApi } from "@api/milestoneApi";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useMilestoneModalController } from "@features/ProjectDetail/component/Milestone/hooks/controller/useMilestoneModalController";
import { useMilestonePageController } from "@features/ProjectDetail/component/Milestone/hooks/controller/useMilestonePageController";
import { useMilestoneStates } from "@features/ProjectDetail/component/Milestone/hooks/state/useMilestoneStates";
import { InitPayload } from "@features/ProjectDetail/component/Milestone/types/milestone";

export const useMilestoneController = (projectId: string) => {
    const states = useMilestoneStates();

    const api = useApiWithProjectId(projectId, milestoneApi);

    const modalDispatch = useMilestoneModalController(
        states.milestones,
        states.modal,
        api,
        InitPayload(projectId),
    );

    const pageDispatch = useMilestonePageController(states.milestones, api);

    return {
        pageDispatch,
        modalDispatch,
    };
};
