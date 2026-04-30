import { ProjectPayload, ProjectRow, ProjectStatus, toProjectPayload } from "../../../../types/db/project";

import { useProjectListActions } from "../handler/useProjectListActions";
import { useProjectListStates } from "../state/useProjectListStates";

export const useProjectListController = () => {
    // 一覧・検索
    const {
        projects, setProjects,
        search, setSearch,
        page, setPage,
        totalNum, setTotalNum, limit,
        modalState, setModalState,
    } = useProjectListStates();

    const { createProject, updateProject, searchProjects } =
        useProjectListActions(setProjects, setTotalNum);

    // -----------------------------
    // モーダル制御
    // -----------------------------
    const closeModal = () => {
        setModalState({ open: false });
    };

    const openCreateModal = () => {
        const empty: ProjectPayload = {
            id: "",
            name: "",
            client: "",
            description: "",
            status: ProjectStatus.Planned,
            start_date: "",
            end_date: "",
            owner: "",
        };

        setModalState({ open: true, mode: "new", form: empty });
    };

    const openEditModal = (project: ProjectRow) => {
        setModalState({
            open: true,
            mode: "edit",
            form: toProjectPayload(project),
            projectId: project.id
        });
    };

    const validate = (data: ProjectPayload): string[] => {
        // 必須項目のメッセージ定義（型安全）
        const required: Record<keyof ProjectPayload, string> = {
            id: "IDは必須です",
            name: "案件名は必須です",
            client: "顧客名は必須です",
            description: "",
            status: "ステータスは必須です",
            start_date: "開始日は必須です",
            end_date: "終了日は必須です",
            owner: "担当者は必須です",
            timestamps: "",
        };

        const errors: string[] = [];

        (Object.keys(required) as (keyof ProjectPayload)[]).forEach((key) => {
            const message = required[key];
            if (!message) return;

            const value = data[key];
            if (!value || value.toString().trim() === "") {
                errors.push(message);
            }
        });

        if (data.start_date && data.end_date &&
            data.start_date > data.end_date) {
            errors.push("開始日は終了日より前である必要があります");
        }
        return errors;
    };

    // -----------------------------
    // 作成
    // -----------------------------
    const handleCreate = async () => {
        if (!modalState.open || modalState.mode !== "new") return;

        const errors = validate(modalState.form);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await createProject(modalState.form, search, page, limit);
        closeModal();
    };

    // -----------------------------
    // 更新処理
    // -----------------------------
    const handleUpdate = async () => {
        if (!modalState.open || modalState.mode !== "edit") return;

        const errors = validate(modalState.form);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await updateProject(modalState.form, search, page, limit);
        closeModal();
    };

    // -----------------------------
    // 検索
    // -----------------------------
    const handleSearch = async () => {
        await searchProjects(search, page, limit);
    };


    // -----------------------------
    // 検索クリア
    // -----------------------------
    const clearSearch = async () => {
        setSearch({
            name: "",
            client: "",
            status: ProjectStatus.All,
        });
        await searchProjects({}, 1, limit);
    };

    const updateForm = (key: keyof ProjectPayload, value: string) => {
        if (!modalState.open) return;
        setModalState({
            ...modalState,
            form: {
                ...modalState.form,
                [key]: value,
            },
        });
    };

    return {
        // 一覧
        projects,
        searchProjects,
        page, setPage,
        totalNum, setTotalNum, limit,

        // 検索
        search,
        setSearch,
        handleSearch,
        clearSearch,

        // モーダル
        modalState,
        setModalState,
        openCreateModal,
        openEditModal,
        closeModal,
        updateForm,

        // 作成・更新
        handleCreate,
        handleUpdate,
    };
};