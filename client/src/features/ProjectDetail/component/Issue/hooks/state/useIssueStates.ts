import { IssuePayload, IssueRow } from "@comtypes/db/issue";
import { useModal } from "@hooks/useModal";
import { useStateObj } from "@hooks/useStateObj";

export const useIssueStates = () => {
    const { dispatch: issue } = useStateObj<IssueRow[]>([]);
    const { dispatch: modal } = useModal<IssuePayload, string>();

    return {
        issue,
        modal,
    };
};