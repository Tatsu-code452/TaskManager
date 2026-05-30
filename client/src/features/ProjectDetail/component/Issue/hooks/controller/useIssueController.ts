import { issueApi } from "@api/issueApi";
import { InitPayload } from "@comtypes/db/issue";
import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useIssueModalController } from "@features/ProjectDetail/component/Issue/hooks/controller/useIssueModalController";
import { useIssuePageController } from "@features/ProjectDetail/component/Issue/hooks/controller/useIssuePageController";
import { useIssueStates } from "@features/ProjectDetail/component/Issue/hooks/state/useIssueStates";

export const useIssueController = (projectId: string) => {
    const states = useIssueStates();

    const api = useApiWithProjectId(projectId, issueApi);

    const modalDispatch = useIssueModalController(
        states.issue,
        states.modal,
        api,
        InitPayload(projectId),
    );

    const pageDispatch = useIssuePageController(states.issue, api);

    return {
        pageDispatch,
        modalDispatch,
    };
};
