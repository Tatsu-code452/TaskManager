import { useProjectProgressController } from "../hooks/controller/useProjectProgressController";
import { ProjectProgressGrid } from "./grid/ProjectProgressGrid";
import styles from "./index.module.css";

interface ProjectProgressPageProps {
    projectId: string;
}

export const ProjectProgressPage = ({
    projectId,
}: ProjectProgressPageProps) => {
    const {
        pageState,
        dates,
        editDispatch,
        selectors,
        inputDataDef,
        onLoadTasks,
    } = useProjectProgressController(projectId);

    return (
        <div
            data-testid="ProjectProgressPage"
            className={styles.page_container}
        >
            <div className={styles.section_card}>
                <div className={styles.section_title}>ガントチャート</div>

                {/* 日付レンジ設定 */}
                <div data-testid="range_area" className={styles.range_area}>
                    {inputDataDef.map((v) => (
                        <div key={v.id}>
                            <label htmlFor={v.id}>{v.label}</label>
                            <input
                                id={v.id}
                                type="date"
                                value={v.value}
                                onChange={v.onChange}
                            />
                        </div>
                    ))}
                </div>

                {/* ガントチャート本体 */}
                <div>
                    <ProjectProgressGrid
                        dates={dates}
                        tasks={pageState.tasks}
                        baseDate={pageState.baseDate}
                        projectId={projectId}
                        editDispatch={editDispatch}
                        selectors={selectors}
                        onLoadTasks={onLoadTasks}
                    />
                </div>
            </div>
        </div>
    );
};
