import { useCallback } from "react";
import { projectApi } from "../../../../api/tauri/projectApi";
import { ProjectPayload, ProjectRow, ProjectStatus, toProjectPayload } from "../../../../types/db/project";
import { DispProjectStatus, RequiredKeys } from "../../types/model";

import { useProjectFormStates } from "../state/useProjectFormStates";
import { useProjectListStates } from "../state/useProjectListStates";

export const useProjectListController = () => {
    // 一覧・検索
    const {
        projects,
        setProjects,
        search,
        setSearch,
    } = useProjectListStates();

    // モーダル・フォーム
    const {
        form,
        setForm,
        modalMode,
        setModalMode,
    } = useProjectFormStates();

    // -----------------------------
    // 一覧取得
    // -----------------------------
    const load = useCallback(async () => {
        const list = await projectApi.list();
        setProjects(list);
    }, [setProjects]);

    // -----------------------------
    // 検索
    // -----------------------------
    // TODO: 未完成
    const searchProjects = useCallback(async () => {
        const list = await projectApi.list();
        setProjects(list);
    }, [setProjects]);

    // -----------------------------
    // 検索クリア
    // -----------------------------
    const clearSearch = () => {
        setSearch({
            name: "",
            client: "",
            status: DispProjectStatus.All,
        });
    };

    // -----------------------------
    // モーダル制御
    // -----------------------------
    const closeModal = () => {
        setModalMode(null);
        setForm(null);
    };

    // -----------------------------
    // 新規作成モード
    // -----------------------------
    const openCreateModal = () => {
        const projectPayLoad: ProjectPayload = {
            id: "",
            name: "",
            client: "",
            description: "",
            status: ProjectStatus.Planned,
            start_date: "",
            end_date: "",
            owner: "",
        };

        setForm(projectPayLoad);
        setModalMode("new");
    };

    // -----------------------------
    // 編集モード
    // -----------------------------
    const openEditModal = (project: ProjectRow) => {
        setForm(toProjectPayload(project));
        setModalMode("edit");
    };

    const validate = (data: ProjectPayload): string[] => {
        // 必須項目のメッセージ定義（型安全）
        const requiredRules: Record<RequiredKeys, string> = {
            id: "IDは必須です",
            name: "案件名は必須です",
            client: "顧客名は必須です",
            status: "ステータスは必須です",
            start_date: "開始日は必須です",
            end_date: "終了日は必須です",
            owner: "担当者は必須です",
        };
        const errors: string[] = [];

        // 必須チェック（型安全にループ）
        (Object.keys(requiredRules) as RequiredKeys[]).forEach((key) => {
            const value = data[key];
            if (!value || value.toString().trim() === "") {
                errors.push(requiredRules[key]);
            }
        });

        // 日付整合性
        if (data.start_date && data.end_date) {
            if (data.start_date > data.end_date) {
                errors.push("開始日は終了日より前である必要があります");
            }
        }

        return errors;
    };

    // -----------------------------
    // 作成処理
    // -----------------------------
    const handleSubmitCreate = async () => {
        if (!form) return;

        const errors = validate(form);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await projectApi.create(form);
        await load();
        closeModal();
    };

    // -----------------------------
    // 更新処理
    // -----------------------------
    const handleSubmitUpdate = async () => {
        if (!form) return;

        const errors = validate(form);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await projectApi.update(form);
        await load();
        closeModal();
    };

    return {
        // 一覧
        projects,
        loadProjects: load,

        // 検索
        search,
        setSearch,
        searchProjects,
        clearSearch,

        // モーダル
        modalMode,
        form,
        setForm,
        openCreateModal,
        openEditModal,
        closeModal,

        // 作成・更新
        handleSubmitCreate,
        handleSubmitUpdate,
    };
};