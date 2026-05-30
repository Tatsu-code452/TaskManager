import { defectApi } from "@api/defectApi";
import { InitPayload } from "@comtypes/db/defect";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useDefectModalController } from "@features/ProjectDetail/component/Defect/hooks/controller/useDefectModalController";
import { useDefectPageController } from "@features/ProjectDetail/component/Defect/hooks/controller/useDefectPageController";
import { useDefectStates } from "@features/ProjectDetail/component/Defect/hooks/state/useDefectStates";

export const useDefectController = (projectId: string) => {
    const states = useDefectStates();

    const api = useApiWithProjectId(projectId, defectApi);

    const modalDispatch = useDefectModalController(
        states.defect,
        states.modal,
        api,
        InitPayload(projectId),
    );

    const pageDispatch = useDefectPageController(states.defect, api);

    return {
        pageDispatch,
        modalDispatch,
    };
};
