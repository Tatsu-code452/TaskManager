import Button from "@components/Button/Button";
import Form from "@components/Form/Form";
import { GridTableCreator } from "@components/GridTable/GridTableCreatorExtend";
import { usePhaseController } from "@features/ProjectDetail/component/Phase/hooks/controller/usePhaseController";
import { sectionDefinitions } from "@features/ProjectDetail/component/Phase/ui/creator/PhaseFormCreator";
import { tableCreator } from "@features/ProjectDetail/component/Phase/ui/creator/PhaseTableCreator";
import { useEffect } from "react";
import styles from "./PhaseTab.module.css";

interface PhaseTabProps {
    projectId: string;
}
export const PhaseTab = ({ projectId }: PhaseTabProps) => {
    const { pageDispatch, modalDispatch } = usePhaseController(projectId);

    useEffect(() => {
        pageDispatch.handleLoad();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.section_card}>
                <div className={styles.header_actions}>
                    <div className={styles.section_title}>フェーズ一覧</div>
                    <Button
                        variant="primary"
                        onClick={modalDispatch.onOpenCreate}
                    >
                        新規作成
                    </Button>
                </div>

                <div className={styles.table_wrapper}>
                    <GridTableCreator
                        tableDefinition={tableCreator(
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
