import Button from "@components/Button/Button";
import Form from "@components/Form/Form";
import { GridTableCreator } from "@components/GridTable/GridTableCreatorExtend";
import { useIssueController } from "@features/ProjectDetail/component/Issue/hooks/controller/useIssueController";
import { sectionDefinitions } from "@features/ProjectDetail/component/Issue/ui/creator/IssueFormCreator";
import { issueTable } from "@features/ProjectDetail/component/Issue/ui/creator/IssueTableCreator";
import { useEffect } from "react";
import styles from "./IssueTab.module.css";

interface IssueTabProps {
    projectId: string;
}
export const IssueTab = ({ projectId }: IssueTabProps) => {
    const { pageDispatch, modalDispatch } = useIssueController(projectId);

    useEffect(() => {
        pageDispatch.handleLoad();
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.section_card}>
                <div className={styles.header_actions}>
                    <div className={styles.section_title}>課題一覧</div>
                    <Button
                        variant="primary"
                        onClick={modalDispatch.onOpenCreate}
                    >
                        新規作成
                    </Button>
                </div>

                <div className={styles.table_wrapper}>
                    <GridTableCreator
                        tableDefinition={issueTable(
                            pageDispatch.handleDelete,
                            modalDispatch.onOpenEdit,
                        )}
                        rows={pageDispatch.pageState}
                    />
                </div>

                {modalDispatch.isOpen && (
                    <Form
                        state={modalDispatch.state}
                        sectionDefinition={sectionDefinitions}
                        onChange={modalDispatch.onChangeForm}
                        onSubmit={modalDispatch.handleConfirm}
                        onClose={modalDispatch.handleClose}
                    />
                )}
            </div>
        </div>
    );
};
