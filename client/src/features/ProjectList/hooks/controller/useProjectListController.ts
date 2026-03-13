/**
 * @test-import import { ProjectStatus } from "../../../../types/db/project";
 * @test-import import { Project } from "../../types/model";
 * @test-var-block project
 * const project: Project = {
 *   id: "1111",
 *   name: "name",
 *   client: "client",
 *   status: ProjectStatus.Planned,
 *   startDate: "2026-01-01",
 *   endDate: "2026-01-01",
 *   progress: 25,
 * }
 * @end-test-var-block
 * @test-var-block mock
 * vi.mock("../../../../api/tauri/projectApi", () => ({
 *   projectApi: {
 *     list: vi.fn(),
 *     create: vi.fn(),
 *     update: vi.fn(),
 *   }
 * }));
 * @end-test-var-block
 */
import { useCallback } from "react";
import { projectApi, ProjectPayload } from "../../../../api/tauri/projectApi";
import { ProjectStatus } from "../../../../types/db/project";
import { Project } from "../../types/model";

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
    const loadProjects = useCallback(async () => {
        const list = await projectApi.list(
            search.name,
            search.client,
            search.status,
        );
        setProjects(list);
    }, [setProjects]);

    // -----------------------------
    // 検索
    // -----------------------------
    const searchProjects = useCallback(async () => {
        const list = await projectApi.list(
            search.name,
            search.client,
            search.status,
        );
        setProjects(list);
    }, [setProjects]);

    // -----------------------------
    // 検索クリア
    // -----------------------------
    const clearSearch = () => {
        setSearch({
            name: "",
            client: "",
            status: ProjectStatus.All,
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
        setForm({
            id: "",
            name: "",
            client: "",
            status: ProjectStatus.Planned,
            start_date: "",
            end_date: "",
        });
        setModalMode("create");
    };

    // -----------------------------
    // 編集モード
    // -----------------------------
    const openEditModal = (project: Project) => {
        setForm({
            id: project.id,
            name: project.name,
            client: project.client,
            status: project.status,
            start_date: project.startDate,
            end_date: project.endDate,
        });
        setModalMode("edit");
    };

    const validate = (data: ProjectPayload): string[] => {
        const errors: string[] = [];

        // ID（キー情報）
        if (!data.id || data.id.trim() === "") {
            errors.push("IDは必須です");
        }

        // 名称
        if (!data.name || data.name.trim() === "") {
            errors.push("案件名は必須です");
        }

        // 顧客名
        if (!data.client || data.client.trim() === "") {
            errors.push("顧客名は必須です");
        }

        // ステータス
        if (!data.status) {
            errors.push("ステータスは必須です");
        }

        // 日付
        if (!data.start_date) {
            errors.push("開始日は必須です");
        }
        if (!data.end_date) {
            errors.push("終了日は必須です");
        }

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
        await loadProjects();
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
        await loadProjects();
        closeModal();
    };

    return {
        // 一覧
        projects,
        loadProjects,

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