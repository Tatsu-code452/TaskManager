import { useValidate } from "@features/ProjectList/hooks/handler/useValidate";
import { emptyPayload } from "@features/ProjectList/types/model";
import { Api, SearchController, States } from "@features/ProjectList/types/types";
import { useMemo } from "react";
import { ProjectPayload, ProjectRow, toProjectPayload } from "../../../../types/db/project";

export const useModalController = (
    projects: States["projects"],
    modal: States["modal"],
    onSearch: SearchController["handleSearch"],
    onSubmit: Api["handleSubmit"],
) => {
    const { handleValidate } = useValidate();

    const handleClose = () => {
        modal.close();
    };

    const handleOpen = (mode: "new" | "edit", payload: ProjectPayload) => {
        if (mode === "new") {
            modal.open.new(payload);
        } else if (mode === "edit") {
            modal.open.edit(payload.id, payload);
        }
    };

    const handleConfirm = async () => {
        if (!handleValidate(modal.state.data.form)) {
            return;
        }
        await onSubmit(modal.state.data.mode, modal.state.data.form);
        const result = await onSearch();
        if (result) projects.setState(result);
        handleClose();
    };

    return useMemo(() => ({
        state: modal.state,
        isOpen: modal.state.isOpen,
        onOpenCreate: () => handleOpen("new", emptyPayload),
        onOpenEdit: (project: ProjectRow) =>
            handleOpen("edit", toProjectPayload(project)),
        onChangeForm: modal.setFormField,
        handleClose,
        handleConfirm,
    }), [modal.state, projects.state]);
}