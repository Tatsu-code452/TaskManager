import { ProjectPayload, ProjectRow, toProjectPayload } from "@comtypes/db/project";
import { Api, SearchCondition, SearchController, States } from "@features/ProjectList/types/types";
import { useMemo } from "react";

export const usePageController = (
    searchDispatch: SearchController,
    projects: States["projects"],
    form: States["form"],
    handleDelete: Api["handleDelete"],
    handleSubmit: Api["handleSubmit"],
) => {
    const handleLoadProjects = async (options?: {
        condition?: SearchCondition,
        mode?: "next" | "prev",
    }) => {
        const result = await searchDispatch.handleSearchByOption(options);
        if (result) projects.setState(result);
    }

    const handleDeleteProject = async (id: string) => {
        await handleDelete(id);
        await handleLoadProjects();
    }

    const handleSubmitProject = async (payload: ProjectPayload) => {
        await handleSubmit("edit", payload);
        await handleLoadProjects();
    }

    return useMemo(() => ({
        projects: projects.state,
        onStartEdit: (project: ProjectRow) => {
            form.setAll(toProjectPayload(project));
        },
        handleLoadProjects,
        onChangeForm: form.setField,
        onSubmitForm: async () => await handleSubmitProject(form.state),
        onRemove: handleDeleteProject,
    }), [form.state, projects.state, searchDispatch.search, searchDispatch.pagination]);
}