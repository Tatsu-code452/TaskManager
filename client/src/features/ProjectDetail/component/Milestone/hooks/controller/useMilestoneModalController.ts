import { MilestonePayload, MilestoneRow, toMilestonePayload } from "@comtypes/db/milestone";
import { useModalController } from "@features/common/hooks/controller/useModalController";
import { Api, ModalState, PageState } from "@features/ProjectDetail/component/Milestone/types/milestone";
import { getMessage, Messages } from "@hooks/useMessage";
import { useMemo } from "react";

const required: Record<string, string> = {
    title: getMessage(Messages.E0001, "タイトル"),
    status: getMessage(Messages.E0001, "ステータス"),
    start_date: getMessage(Messages.E0001, "開始日"),
    end_date: getMessage(Messages.E0001, "終了日"),
};

export const useMilestoneModalController = (
    pageState: PageState,
    modal: ModalState,
    api: Api,
    initPayload: MilestonePayload,
) => {
    const modalDispatch = useModalController(pageState, modal, api, required);

    return useMemo(() => ({
        ...modalDispatch,
        onOpenCreate: () => modalDispatch.onOpenEdit(initPayload),
        onOpenEdit: (param: MilestoneRow) =>
            modalDispatch.onOpenEdit(toMilestonePayload(param)),
    }), [pageState.state, modal.state]);
}