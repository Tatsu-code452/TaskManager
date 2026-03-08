import { useState } from "react";
import { Button } from "../../../components/Button";
import { useProgressPageController } from "../hooks/controller/useProgressPageController";
import CsvImportDialog from "./parts/CsvImportDialog";
import InputDateArea from "./parts/InputDateArea";
import { ProgressTable } from "./parts/table/ProgressTable";
import styles from "./style.module.css";

export const ProgressPage = () => {
    const {
        pageState,
        editTarget,
        dispatch,
        dates,
        cancelEdit,
        handleChangeCell,
        handleKeyDownCell,
        handleAllocate,
        handleCreateTasks,
    } = useProgressPageController();
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.task_manage_wrapper}>
            <h1>進捗管理機能</h1>

            {/* 表示範囲・基準日 */}
            <div>
                <InputDateArea
                    from={pageState.displayRange.from}
                    to={pageState.displayRange.to}
                    baseDate={pageState.baseDate}
                    setFrom={dispatch.setFrom}
                    setTo={dispatch.setTo}
                    setBaseDate={dispatch.setBaseDate}
                    onClick={handleAllocate}
                />
                <Button onClick={() => setOpen(true)}>CSV読み込み</Button>

                <CsvImportDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onSubmit={handleCreateTasks}
                />
            </div>

            {/* タスク + 日付マトリックス */}
            <div className={styles.table_wrapper}>
                <ProgressTable
                    dates={dates}
                    pageState={pageState}
                    editTarget={editTarget}
                    cancelEdit={cancelEdit}
                    handleKeyDownCell={handleKeyDownCell}
                    handleChangeCell={handleChangeCell}
                />
            </div>
        </div>
    );
};
