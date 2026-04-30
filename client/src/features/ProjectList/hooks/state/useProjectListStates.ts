import { useState } from "react";
import { ProjectPayload, ProjectRow, ProjectSearchCondition, ProjectStatus } from "../../../../types/db/project";

export type ModalState =
    | { open: false }
    | { open: true; mode: "new"; form: ProjectPayload }
    | { open: true; mode: "edit"; form: ProjectPayload; projectId: string };

export const useProjectListStates = () => {
    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [search, setSearch] = useState<ProjectSearchCondition>({
        name: "",
        client: "",
        status: ProjectStatus.All,
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 20;
    const [modalState, setModalState] = useState<ModalState>({ open: false });

    return {
        projects, setProjects,
        search, setSearch,
        page, setPage,
        totalNum: totalPages, setTotalNum: setTotalPages, limit,
        modalState, setModalState,
    };
};