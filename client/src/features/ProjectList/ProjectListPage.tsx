import { InputSelectors } from "@components/InputSelectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import commonStyles from "../../common.module.css";
import { Button } from "../../components";
import Pagination from "../../components/Pagination";
import { useProjectListController } from "./hooks/controller/useProjectListController";
import styles from "./index.module.css";
import { createSearchInputs, InitCondition } from "./types/model";
import { ProjectForm, ProjectTable } from "./ui";

export const ProjectListPage = () => {
    const { modalDispatch, pageDispatch, searchDispatch } =
        useProjectListController();

    useEffect(() => {
        pageDispatch.handleLoadProjects();
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
                <InputSelectors
                    inputs={createSearchInputs(searchDispatch.search)}
                    className={styles.search_input}
                    rowClassName={styles.search_row}
                    onChange={searchDispatch.onChangeCondition}
                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                        if (e.key === "Enter")
                            pageDispatch.handleLoadProjects();
                    }}
                />

                <div className={styles.search_button_group}>
                    <Button
                        variant="primary"
                        onClick={() => pageDispatch.handleLoadProjects()}
                    >
                        検索
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            pageDispatch.handleLoadProjects({
                                condition: InitCondition,
                            })
                        }
                    >
                        クリア
                    </Button>
                </div>
            </div>

            <div data-testid="pagination-area">
                <Pagination
                    state={searchDispatch.pagination}
                    onNext={() =>
                        pageDispatch.handleLoadProjects({ mode: "next" })
                    }
                    onPrev={() =>
                        pageDispatch.handleLoadProjects({ mode: "prev" })
                    }
                />
            </div>

            <div
                data-testid="table_wrapper"
                className={`${commonStyles.table_wrapper} ${styles.table_wrapper}`}
            >
                <ProjectTable
                    projects={pageDispatch.projects}
                    navigation={navigation}
                    onChangeForm={pageDispatch.onChangeForm}
                    onStartEdit={pageDispatch.onStartEdit}
                    onCommit={pageDispatch.onSubmitForm}
                    onRemove={pageDispatch.onRemove}
                    openEditModal={modalDispatch.onOpenEdit}
                />
            </div>

            {/* モーダル */}
            {modalDispatch.isOpen && (
                <ProjectForm
                    state={modalDispatch.state}
                    onChange={modalDispatch.onChangeForm}
                    onSubmit={modalDispatch.handleConfirm}
                    onClose={modalDispatch.handleClose}
                />
            )}
        </div>
    );
};
