import { useMemo } from "react";
import { ProjectPayload, ProjectRow, ProjectSearchCondition, ProjectStatus, toProjectPayload } from "../../../../types/db/project";
import { emptyPayload } from "../../types/model";
import { useProjectListHandler } from "../handler/useProjectListHandler";
import { useProjectListStates } from "../state/useProjectListStates";


export const useProjectListController = () => {
    const {
        projects,
        search,
        modal,
        form,
        pagination,
    } = useProjectListStates();

    const {
        handleValidate,
        handleSubmit,
        searchProjects
    } = useProjectListHandler();

    const onSearch = async (condition: ProjectSearchCondition, page: number, limit: number) => {
        const result = await searchProjects(condition, page, limit);
        if (!result) return;
        projects.setState(result.items);
        pagination.updateTotal(result.total_num);
    };

    const onSearchByState = async () => {
        await onSearch(search.state, pagination.state.page, pagination.state.limit);
    };

    const onSearchByPage = async (page: number) => {
        await onSearch(search.state, page, pagination.state.limit);
        pagination.setPage(page);
    };

    const onSearchByInitCondition = async () => {
        await onSearch(
            { name: "", client: "", status: ProjectStatus.All },
            pagination.state.page, pagination.state.limit);
        search.reset();
        pagination.reset();
    };

    const onCloseModal = () => {
        form.reset();
        modal.close();
    };

    type ModalMode = "new" | "edit";
    const onOpenModal = (mode: ModalMode, payload: ProjectPayload) => {
        form.setAll(payload);
        if (mode === "new") {
            modal.open.new(payload);
        } else if (mode === "edit") {
            modal.open.edit(payload.id, payload);
        }
    };

    const modalDispatch = useMemo(() => ({
        state: modal.state,
        isOpen: modal.state.isOpen,
        onClose: onCloseModal,
        onOpenCreate: () => onOpenModal("new", emptyPayload),
        onOpenEdit: (project: ProjectRow) =>
            onOpenModal("edit", toProjectPayload(project)),
        onChangeForm: form.setField,
        onConfirm: async () => {
            if (!handleValidate(form.state)) {
                return;
            }
            await handleSubmit(modal.state.data.mode, form.state);
            await onSearchByState();
            onCloseModal();
        },
    }), [modal.state, form.state]);

    const pageDispatch = useMemo(() => ({
        state: {
            projects: projects.state,
            pagination: pagination.state,
            search: search.state,
        },

        onChangeSearchCondition: search.setField,
        onSearch: onSearchByState,
        onClearSearch: onSearchByInitCondition,
        onSearchKeyDown: async (e: React.KeyboardEvent<HTMLElement>) => {
            if (e.key === "Enter") await onSearchByState();
        },
        onNextPage: async () => onSearchByPage(pagination.next()),
        onPrevPage: async () => onSearchByPage(pagination.prev()),
        onStartEdit: (project: ProjectRow) => {
            form.setAll(toProjectPayload(project));
        },
        onChangeForm: form.setField,
        onSubmitForm: async () => {
            await handleSubmit("edit", form.state);
            await onSearchByState();
        },
    }), [form.state, projects.state, search.state, pagination.state]);

    return {
        modalDispatch,
        pageDispatch,
    };
};