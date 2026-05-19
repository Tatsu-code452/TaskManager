import { useApiWithProjectId } from "@features/common/hooks/handler/useApiWithProjectId";
import { useValidate } from "@features/common/hooks/handler/useValidate";
import { useModal } from "@hooks/useModal";
import { useStateObj } from "@hooks/useStateObj";
import { useMemo } from "react";

export const useModalController = <DbRow extends object, Payload extends object>(
    pageState: ReturnType<typeof useStateObj<DbRow[]>>["dispatch"],
    modal: ReturnType<typeof useModal<Payload, string>>["dispatch"],
    api: ReturnType<typeof useApiWithProjectId<DbRow, Payload>>,
    required: Record<string, string>,
) => {
    const { handleValidate } = useValidate<Payload>(required);

    const handleClose = () => {
        modal.close();
    };

    const handleOpen = (mode: "new" | "edit", payload: Payload) => {
        if (mode === "new") {
            modal.open.new(payload);
        } else if (mode === "edit" && "id" in payload) {
            modal.open.edit(payload.id as string, payload);
        }
    };

    const handleConfirm = async () => {
        if (!handleValidate(modal.state.data.form)) {
            return;
        }
        await api.handleSubmit(modal.state.data.mode, modal.state.data.form);
        const result = await api.handleList();
        if (result) pageState.setState(result);
        handleClose();
    };

    return useMemo(() => ({
        state: modal.state,
        isOpen: modal.state.isOpen,
        onOpenCreate: (payload: Payload) => handleOpen("new", payload),
        onOpenEdit: (payload: Payload) => handleOpen("edit", payload),
        onChangeForm: modal.setFormField,
        handleClose,
        handleConfirm,
    }), [pageState.state, modal.state]);
}