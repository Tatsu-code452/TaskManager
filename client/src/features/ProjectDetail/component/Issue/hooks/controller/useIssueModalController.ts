import { IssuePayload, IssueRow, toIssuePayload } from "@comtypes/db/issue";
import { useModalController } from "@features/common/hooks/controller/useModalController";
import { Api, ModalState, PageState } from "@features/ProjectDetail/component/Issue/types/issue";
import { getMessage, Messages } from "@hooks/useMessage";
import { useMemo } from "react";

const required: Record<string, string> = {
    title: getMessage(Messages.E0001, "タイトル"),
    status: getMessage(Messages.E0001, "ステータス"),
};

export const useIssueModalController = (
    pageState: PageState,
    modal: ModalState,
    api: Api,
    initPayload: IssuePayload,
) => {
    const modalDispatch = useModalController(pageState, modal, api, required);

    return useMemo(() => ({
        ...modalDispatch,
        onOpenCreate: () => modalDispatch.onOpenEdit(initPayload),
        onOpenEdit: (param: IssueRow) =>
            modalDispatch.onOpenEdit(toIssuePayload(param)),
    }), [pageState.state, modal.state]);
}