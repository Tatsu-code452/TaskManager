import { useProjectProgressController } from "../hooks/controller/useProjectProgressController";
import styles from "./index.module.css";
import { ProjectProgressTable } from "./table/ProjectProgressTable";

interface ProjectProgressPageProps {
    projectId: string;
}

export const ProjectProgressPage = ({
    projectId,
}: ProjectProgressPageProps) => {
    const {
        pageState,
        dates,
        editTarget,
        dispatch,
        handleKeyDownCell,
        handleChangeCell,
        onDragMove,
        onDragResize,
        togglePhase,
        toggleAllPhases,
        allCollapsed,
        collapsedPhases,
    } = useProjectProgressController(projectId);

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
                        baseDate={pageState.baseDate}
                        editTarget={editTarget}
                        handleKeyDownCell={handleKeyDownCell}
                        handleChangeCell={handleChangeCell}
                        startEdit={dispatch.startEdit}
                        endEdit={dispatch.endEdit}
                        onDragMove={onDragMove}
                        onDragResize={onDragResize}
                        collapsedPhases={collapsedPhases}
                        togglePhase={togglePhase}
                        toggleAllPhases={toggleAllPhases}
                        allCollapsed={allCollapsed}
                    />
                </div>
            </div>
        </div>
    );
};
