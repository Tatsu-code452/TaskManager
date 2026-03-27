import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import commonStyles from "../../common.module.css";
import { Button } from "../../components";
import { useProjectListController } from "./hooks/controller/useProjectListController";
import styles from "./index.module.css";
import { ProjectForm, ProjectTable } from "./ui";

export const ProjectListPage = () => {
    const {
        projects,
        loadProjects,
        // search,
        // setSearch,
        // searchProjects,
        // clearSearch,
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

    const navigation = useNavigate();

    return (
        <div className={commonStyles.container}>
            <h2>案件管理システム:プロジェクト一覧</h2>

            {/* 新規作成ボタン（右上） */}
            <div className={styles.header_actions}>
                <Button variant="primary" onClick={openCreateModal}>
                    新規作成
                </Button>
            </div>

            {/* TODO:検索エリア */}
            {/* <div className={styles.search_area}>
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
            </div> */}

            <div>
                <ProjectTable
                    projects={projects}
                    navigation={navigation}
                    openEditModal={openEditModal}
                />
            </div>

            {/* モーダル */}
            {modalMode && (
                <ProjectForm
                    form={form}
                    onChange={(key, value) =>
                        setForm({ ...form, [key]: value })
                    }
                    onSubmit={
                        modalMode === "new"
                            ? handleSubmitCreate
                            : handleSubmitUpdate
                    }
                    onClose={closeModal}
                    mode={modalMode}
                />
            )}
        </div>
    );
};
