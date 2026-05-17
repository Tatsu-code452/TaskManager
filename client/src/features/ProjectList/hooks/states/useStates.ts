import { ProjectPayload, ProjectRow } from "@comtypes/db/project";
import { emptyPayload, InitCondition } from "@features/ProjectList/types/model";
import { SearchCondition } from "@features/ProjectList/types/types";
import { useForm } from "@hooks/useForm";
import { useModal } from "@hooks/useModal";
import { usePagination } from "@hooks/usePagination";
import { useSearch } from "@hooks/useSearch";
import { useStateObj } from "@hooks/useStateObj";

export const useFormStates = () => {
    const { dispatch: projects } = useStateObj<ProjectRow[]>([]);
    const { dispatch: search } =
        useSearch<SearchCondition>("project_search", InitCondition);
    const { dispatch: pagination } = usePagination(20);
    const { dispatch: form } = useForm<ProjectPayload>(emptyPayload);
    const { dispatch: modal } = useModal<ProjectPayload, string>();

    return { projects, modal, form, search, pagination }
};
