import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectProgressController } from "../hooks/controller/useProjectProgressController";
import styles from "./index.module.css";
import { ProjectProgressTable } from "./table/ProjectProgressTable";

export const ProjectProgressPage = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = id;

    const {
        pageState,
        dates,
        editTarget,
        dispatch,
        handleKeyDownCell,
        handleChangeCell,
        cancelEdit,
        onDragMove,
        onDragResize,
        loadTasks,
        togglePhase,
        toggleAllPhases,
        allCollapsed,
        collapsedPhases,
    } = useProjectProgressController(projectId);

    // 初回ロード
    useEffect(() => {
        loadTasks();
    }, [projectId]);

    return (
        <div className={styles.page_container}>
            <div className={styles.section_card}>
                <div className={styles.section_title}>ガントチャート</div>

                {/* 日付レンジ設定 */}
                <div className={styles.range_area}>
                    <label>開始日</label>
                    <input
                        type="date"
                        value={pageState.displayRange.from}
                        onChange={(e) => dispatch.setFrom(e.target.value)}
                    />

                    <label>終了日</label>
                    <input
                        type="date"
                        value={pageState.displayRange.to}
                        onChange={(e) => dispatch.setTo(e.target.value)}
                    />

                    <label>基準日</label>
                    <input
                        type="date"
                        value={pageState.baseDate}
                        onChange={(e) => dispatch.setBaseDate(e.target.value)}
                    />
                </div>

                {/* ガントチャート本体 */}
                <div className={styles.table_wrapper}>
                    <ProjectProgressTable
                        dates={dates}
                        tasks={pageState.tasks}
                        editTarget={editTarget}
                        handleKeyDownCell={handleKeyDownCell}
                        handleChangeCell={handleChangeCell}
                        cancelEdit={cancelEdit}
                        onDragMove={onDragMove}
                        onDragResize={onDragResize}
                        collapsedPhases={collapsedPhases}
                        togglePhase={togglePhase}
                        toggleAllPhases={toggleAllPhases}
                        allCollapsed={allCollapsed}
                    />{" "}
                </div>
            </div>
        </div>
    );
};
