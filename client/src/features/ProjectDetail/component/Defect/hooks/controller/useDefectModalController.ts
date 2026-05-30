import { DefectPayload, DefectRow, toDefectPayload } from "@comtypes/db/defect";
import { useModalController } from "@features/common/hooks/controller/useModalController";
import { Api, ModalState, PageState } from "@features/ProjectDetail/component/Defect/types/defect";
import { getMessage, Messages } from "@hooks/useMessage";
import { useMemo } from "react";

const required: Record<string, string> = {
    title: getMessage(Messages.E0001, "タイトル"),
    status: getMessage(Messages.E0001, "ステータス"),
};

export const useDefectModalController = (
    pageState: PageState,
    modal: ModalState,
    api: Api,
    initPayload: DefectPayload,
) => {
    const modalDispatch = useModalController(pageState, modal, api, required);

    return useMemo(() => ({
        ...modalDispatch,
        onOpenCreate: () => modalDispatch.onOpenEdit(initPayload),
        onOpenEdit: (param: DefectRow) =>
            modalDispatch.onOpenEdit(toDefectPayload(param)),
    }), [pageState.state, modal.state]);
}