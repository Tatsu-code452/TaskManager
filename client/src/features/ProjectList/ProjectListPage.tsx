import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import commonStyles from "../../common.module.css";
import { Button, InputSelector } from "../../components";
import Pagination from "../../components/Pagination";
import { useProjectListController } from "./hooks/controller/useProjectListController";
import styles from "./index.module.css";
import { createSearchInputs } from "./types/model";
import { ProjectForm, ProjectTable } from "./ui";

export const ProjectListPage = () => {
    const {
        // 一覧
        projects,
        searchProjects,
        page,
        setPage,
        totalNum,
        limit,

        // 検索
        search,
        setSearch,
        handleSearch,
        clearSearch,

        // モーダル
        modalState,
        // setModalState,
        openCreateModal,
        openEditModal,
        closeModal,
        updateForm,

        // 作成・更新
        handleCreate,
        handleUpdate,
    } = useProjectListController();

    useEffect(() => {
        searchProjects({}, page, limit);
    }, [searchProjects, page, limit]);

    const navigation = useNavigate();
    return (
        <div data-testid="container" className={commonStyles.container}>
            <h2>プロジェクト一覧</h2>

            <div className={styles.search_header}>
                <h3>検索</h3>
                <Button variant="primary" onClick={openCreateModal}>
                    新規作成
                </Button>
            </div>

            <div data-testid="search-area" className={styles.search_area}>
                <div className={styles.search_grid}>
                    {createSearchInputs(search).map((input) => (
                        <InputSelector
                            key={input.key}
                            input={input}
                            className={styles.search_input}
                            rowClassName={styles.search_row}
                            onChange={(key, value) =>
                                setSearch({ ...search, [key]: value })
                            }
                        />
                    ))}
                    <div className={styles.search_button_group}>
                        <Button variant="primary" onClick={handleSearch}>
                            検索
                        </Button>
                        <Button variant="secondary" onClick={clearSearch}>
                            クリア
                        </Button>
                    </div>
                </div>
            </div>

            <div>
                <Pagination
                    length={totalNum}
                    totalPages={Math.ceil(totalNum / limit)}
                    page={page}
                    setPage={setPage}
                    onClick={handleSearch}
                />
            </div>

            <div
                data-testid="table_wrapper"
                className={`${commonStyles.table_wrapper} ${styles.table_wrapper}`}
            >
                <ProjectTable
                    projects={projects}
                    navigation={navigation}
                    openEditModal={openEditModal}
                />
            </div>

            {/* モーダル */}
            {modalState.open && (
                <ProjectForm
                    mode={modalState.mode}
                    form={modalState.form}
                    onChange={updateForm}
                    onSubmit={
                        modalState.mode === "new" ? handleCreate : handleUpdate
                    }
                    onClose={closeModal}
                />
            )}
        </div>
    );
};
