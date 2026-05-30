import Button from "@components/Button/Button";
import Form from "@components/Form/Form";
import { GridTableCreator } from "@components/GridTable/GridTableCreatorExtend";
import { useDefectController } from "@features/ProjectDetail/component/Defect/hooks/controller/useDefectController";
import { sectionDefinitions } from "@features/ProjectDetail/component/Defect/ui/creator/DefectFormCreator";
import { defectTable } from "@features/ProjectDetail/component/Defect/ui/creator/DefectTableCreator";
import { useEffect } from "react";
import styles from "./DefectTab.module.css";

interface DefectTabProps {
    projectId: string;
}
export const DefectTab = ({ projectId }: DefectTabProps) => {
    const { pageDispatch, modalDispatch } = useDefectController(projectId);

    useEffect(() => {
        pageDispatch.handleLoad();
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.section_card}>
                <div className={styles.header_actions}>
                    <div className={styles.section_title}>欠陥一覧</div>
                    <Button
                        variant="primary"
                        onClick={modalDispatch.onOpenCreate}
                    >
                        新規作成
                    </Button>
                </div>

                <div className={styles.table_wrapper}>
                    <GridTableCreator
                        tableDefinition={defectTable(
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
