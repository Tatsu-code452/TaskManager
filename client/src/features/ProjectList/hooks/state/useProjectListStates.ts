import { useState } from "react";
import { ProjectStatus } from "../../../../types/db/project";
import { Project, ProjectSearchCondition } from "../../types/model";


export const useProjectListStates = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const [search, setSearch] = useState<ProjectSearchCondition>({
        name: "",
        client: "",
        status: ProjectStatus.All,
    });


    return {
        projects,
        setProjects,
        search,
        setSearch,
    };
};