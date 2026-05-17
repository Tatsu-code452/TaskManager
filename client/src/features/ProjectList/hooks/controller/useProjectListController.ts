import { useModalController } from "@features/ProjectList/hooks/controller/useModalController";
import { usePageController } from "@features/ProjectList/hooks/controller/usePageController";
import { useSearchController } from "@features/ProjectList/hooks/controller/useSearchController";
import { useProjectApi } from "@features/ProjectList/hooks/handler/useProjectApi";
import { useFormStates } from "@features/ProjectList/hooks/states/useStates";


export const useProjectListController = () => {
    const states = useFormStates();
    const api = useProjectApi();

    const searchDispatch = useSearchController(
        states.search,
        states.pagination,
        api.handleSearch
    );
    const modalDispatch = useModalController(
        states.projects,
        states.modal,
        searchDispatch.handleSearch,
        api.handleSubmit
    );

    const pageDispatch = usePageController(
        searchDispatch,
        states.projects,
        states.form,
        api.handleDelete,
        api.handleSubmit,
    );

    return {
        modalDispatch,
        pageDispatch,
        searchDispatch,
    };
};