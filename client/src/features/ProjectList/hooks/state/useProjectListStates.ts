import { useForm } from "../../../../hooks/useForm";
import { useModal } from "../../../../hooks/useModal";
import { usePagination } from "../../../../hooks/usePagination";
import { useSearch } from "../../../../hooks/useSearch";
import { useStateObj } from "../../../../hooks/useStateObj";
import { ProjectPayload, ProjectRow, ProjectSearchCondition, ProjectStatus } from "../../../../types/db/project";
import { emptyPayload } from "../../types/model";

export const useProjectListStates = () => {
    const projects = useStateObj<ProjectRow[]>([]);
    const search = useSearch<ProjectSearchCondition>(
        "project_search",
        { name: "", client: "", status: ProjectStatus.All }
    );
    const modal = useModal<ProjectPayload, string>();
    const form = useForm<ProjectPayload>(emptyPayload);
    const pagination = usePagination(20);

    return {
        projects: projects.dispatch,
        search: search.dispatch,
        modal: modal.dispatch,
        form: form.dispatch,
        pagination: pagination.dispatch,
    };
};