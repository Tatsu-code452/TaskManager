import { TaskPayload, TaskRow, toTaskPayload } from "@comtypes/db/task";
import { useModalController } from "@features/common/hooks/controller/useModalController";
import { Api, ModalState, PageState } from "@features/ProjectDetail/component/Task/types/task";
import { getMessage, Messages } from "@hooks/useMessage";
import { useMemo } from "react";

const required: Record<string, string> = {
    name: getMessage(Messages.E0001, "名称"),
};

export const useTaskModalController = (
    pageState: PageState,
    modal: ModalState,
    api: Api,
    initPayload: TaskPayload,
) => {
    const modalDispatch = useModalController(pageState, modal, api, required);

    return useMemo(() => ({
        ...modalDispatch,
        onOpenCreate: () => modalDispatch.onOpenEdit(initPayload),
        onOpenEdit: (param: TaskRow) =>
            modalDispatch.onOpenEdit(toTaskPayload(param)),
    }), [pageState.state, modal.state]);
}