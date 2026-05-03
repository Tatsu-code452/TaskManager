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
    const { modalDispatch, pageDispatch } = useProjectListController();

    useEffect(() => {
        pageDispatch.onSearch();
    }, []);

    const navigation = useNavigate();
    return (
        <div data-testid="container" className={commonStyles.container}>
            <h2>プロジェクト一覧</h2>

            <div className={styles.search_header}>
                <h3>検索</h3>
                <Button variant="primary" onClick={modalDispatch.onOpenCreate}>
                    新規作成
                </Button>
            </div>

            <div data-testid="search-area" className={styles.search_area}>
                <div className={styles.search_grid}>
                    {createSearchInputs(pageDispatch.state.search).map(
                        (input) => (
                            <InputSelector
                                key={input.key}
                                input={input}
                                className={styles.search_input}
                                rowClassName={styles.search_row}
                                onChange={pageDispatch.onChangeSearchCondition}
                                onKeyDown={pageDispatch.onSearchKeyDown}
                            />
                        ),
                    )}
                    <div className={styles.search_button_group}>
                        <Button
                            variant="primary"
                            onClick={pageDispatch.onSearch}
                        >
                            検索
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={pageDispatch.onClearSearch}
                        >
                            クリア
                        </Button>
                    </div>
                </div>
            </div>

            <div>
                <Pagination
                    state={pageDispatch.state.pagination}
                    onNext={pageDispatch.onNextPage}
                    onPrev={pageDispatch.onPrevPage}
                />
            </div>

            <div
                data-testid="table_wrapper"
                className={`${commonStyles.table_wrapper} ${styles.table_wrapper}`}
            >
                <ProjectTable
                    projects={pageDispatch.state.projects}
                    navigation={navigation}
                    onChangeForm={pageDispatch.onChangeForm}
                    onStartEdit={pageDispatch.onStartEdit}
                    onCommit={pageDispatch.onSubmitForm}
                    openEditModal={modalDispatch.onOpenEdit}
                />
            </div>

            {/* モーダル */}
            {modalDispatch.isOpen && (
                <ProjectForm
                    state={modalDispatch.state}
                    onChange={modalDispatch.onChangeForm}
                    onSubmit={modalDispatch.onConfirm}
                    onClose={modalDispatch.onClose}
                />
            )}
        </div>
    );
};
