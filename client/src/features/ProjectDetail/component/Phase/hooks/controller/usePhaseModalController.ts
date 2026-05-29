import { PhasePayload, PhaseRow, toPhasePayload } from "@comtypes/db/phase";
import { useModalController } from "@features/common/hooks/controller/useModalController";
import { getMessage, Messages } from "@hooks/useMessage";
import { useMemo } from "react";
import { Api, ModalState, PageState } from "../../types/phase";

const required: Record<string, string> = {
    name: getMessage(Messages.E0001, "名称"),
    order: getMessage(Messages.E0001, "No."),
    status: getMessage(Messages.E0001, "ステータス"),
    start_date: getMessage(Messages.E0001, "開始日"),
    end_date: getMessage(Messages.E0001, "終了日"),
};

export const usePhaseModalController = (
    pageState: PageState,
    modal: ModalState,
    api: Api,
    initPayload: PhasePayload,
) => {
    const modalDispatch = useModalController(pageState, modal, api, required);

    return useMemo(() => ({
        ...modalDispatch,
        onOpenCreate: () => modalDispatch.onOpenEdit(initPayload),
        onOpenEdit: (param: PhaseRow) =>
            modalDispatch.onOpenEdit(toPhasePayload(param)),
    }), [pageState.state, modal.state]);
}