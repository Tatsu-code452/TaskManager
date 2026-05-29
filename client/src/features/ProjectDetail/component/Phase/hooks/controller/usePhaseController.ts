import { phaseApi } from "@api/phaseApi";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { usePhaseModalController } from "@features/ProjectDetail/component/Phase/hooks/controller/usePhaseModalController";
import { usePhasePageController } from "@features/ProjectDetail/component/Phase/hooks/controller/usePhasePageController";
import { usePhaseStates } from "@features/ProjectDetail/component/Phase/hooks/state/usePhaseStates";
import { InitPayload } from "@features/ProjectDetail/component/Phase/types/phase";


export const usePhaseController = (projectId: string) => {
    const states = usePhaseStates();

    const api = useApiWithProjectId(projectId, phaseApi);

    const modalDispatch = usePhaseModalController(
        states.phases,
        states.modal,
        api,
        InitPayload(projectId),
    );

    const pageDispatch = usePhasePageController(states.phases, api);

    return {
        pageDispatch,
        modalDispatch,
    };
};
