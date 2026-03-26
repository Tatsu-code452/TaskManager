import { useState } from "react";
import { ProjectRow } from "../../../../types/db/project";
import { DispProjectStatus, ProjectSearchCondition } from "../../types/model";


export const useProjectListStates = () => {
    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [search, setSearch] = useState<ProjectSearchCondition>({
        name: "",
        client: "",
        status: DispProjectStatus.All,
    });


    return {
        projects, setProjects,
        search, setSearch,
    };
};