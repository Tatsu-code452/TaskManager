/**
 * @test-no-props
 * @test-import import { useProjectListController } from "./hooks/controller/useProjectListController";
 * @test-import import { ProjectStatus } from "../../types/db/project";
 * @test-var-block project
 * vi.mock("./hooks/controller/useProjectListController");
 * type Controller = ReturnType<typeof useProjectListController>;
 * const mockController:Controller = {
 *   projects: [],
 *   loadProjects: vi.fn(),
 *   search: { name: "", client: "", status: ProjectStatus.Planned },
 *   setSearch: vi.fn(),
 *   searchProjects: vi.fn(),
 *   clearSearch: vi.fn(),
 *   modalMode: null,
 *   form: null,
 *   setForm: vi.fn(),
 *   openCreateModal: vi.fn(),
 *   openEditModal: vi.fn(),
 *   closeModal: vi.fn(),
 *   handleSubmitCreate: vi.fn(),
 *   handleSubmitUpdate: vi.fn(),
 * };
 * (useProjectListController as Mock).mockReturnValue(mockController);
 * const {
 *   setSearch,
 *   openCreateModal,
 *   searchProjects,
 * } = mockController;
 * @end-test-var-block
 */
import { useEffect } from "react";
import { Modal } from "../../components/Modal";
import { ProjectStatus } from "../../types/db/project";
import { useProjectListController } from "./hooks/controller/useProjectListController";
import styles from "./index.module.css";
import { statusToLabel } from "./types/model";
import { ProjectForm } from "./ui/ProjectForm";

export const ProjectListPage = () => {
    const {
        projects,
        loadProjects,
        search,
        setSearch,
        searchProjects,
        clearSearch,
        modalMode,
        form,
        setForm,
        openCreateModal,
        openEditModal,
        closeModal,
        handleSubmitCreate,
        handleSubmitUpdate,
    } = useProjectListController();

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    return (
        <div className={styles.container}>
            {/* 新規作成ボタン（右上） */}
            <div className={styles.header_actions}>
                <button
                    className={`${styles.button} ${styles.button_primary}`}
                    onClick={openCreateModal}
                >
                    新規案件作成
                </button>
            </div>

            {/* 検索エリア */}
            <div className={styles.search_area}>
                <div className={styles.search_row}>
                    <label className={styles.detail_label}>案件名</label>
                    <input
                        className={styles.detail_input}
                        value={search.name}
                        onChange={(e) =>
                            setSearch({ ...search, name: e.target.value })
                        }
                    />
                </div>

                <div className={styles.search_row}>
                    <label className={styles.detail_label}>顧客名</label>
                    <input
                        className={styles.detail_input}
                        value={search.client}
                        onChange={(e) =>
                            setSearch({ ...search, client: e.target.value })
                        }
                    />
                </div>

                <div className={styles.search_row}>
                    <label className={styles.detail_label}>ステータス</label>
                    <select
                        className={styles.detail_select}
                        value={search.status}
                        onChange={(e) =>
                            setSearch({
                                ...search,
                                status: e.target.value as ProjectStatus,
                            })
                        }
                    >
                        {Object.values(ProjectStatus).map((v) => (
                            <option key={v} value={v}>
                                {statusToLabel(v)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.search_button_group}>
                    <button
                        className={`${styles.button} ${styles.button_primary}`}
                        onClick={searchProjects}
                    >
                        検索
                    </button>
                    <button
                        className={`${styles.button} ${styles.button_secondary}`}
                        onClick={() => {
                            clearSearch();
                            loadProjects();
                        }}
                    >
                        クリア
                    </button>
                </div>
            </div>

            {/* 一覧 */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>案件名</th>
                        <th>顧客名</th>
                        <th>ステータス</th>
                        <th>期間</th>
                        <th>進捗</th>
                        <th>操作</th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.client}</td>
                            <td>{p.status}</td>
                            <td>
                                {p.startDate} 〜 {p.endDate}
                            </td>
                            <td>{p.progress}%</td>
                            <td>
                                <button
                                    className={styles.icon_button}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openEditModal(p);
                                    }}
                                >
                                    ✏️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* モーダル */}
            {modalMode && (
                <Modal
                    title={modalMode === "create" ? "新規案件作成" : "案件編集"}
                    onClose={closeModal}
                >
                    <ProjectForm
                        form={form}
                        onChange={(key, value) =>
                            setForm({ ...form, [key]: value })
                        }
                        onSubmit={
                            modalMode === "create"
                                ? handleSubmitCreate
                                : handleSubmitUpdate
                        }
                        onCancel={closeModal}
                        mode={modalMode}
                    />
                </Modal>
            )}
        </div>
    );
};
