import { useProjectProgressController } from "../hooks/controller/useProjectProgressController";
import styles from "./index.module.css";
import { ProjectProgressGrid } from "./table/grid/ProjectProgressGrid";

interface ProjectProgressPageProps {
    projectId: string;
}

export const ProjectProgressPage = ({
    projectId,
}: ProjectProgressPageProps) => {
    const { pageState, dates, pageStateDispatch, editDispatch, selectors } =
        useProjectProgressController(projectId);

    return (
        <div
            data-testid="ProjectProgressPage"
            className={styles.page_container}
        >
            <div className={styles.section_card}>
                <div className={styles.section_title}>ガントチャート</div>

                {/* 日付レンジ設定 */}
                <div data-testid="range_area" className={styles.range_area}>
                    <label htmlFor="from">開始日</label>
                    <input
                        id="from"
                        type="date"
                        value={pageState.displayRange.from}
                        onChange={(e) =>
                            pageStateDispatch.setFrom(e.target.value)
                        }
                    />

                    <label htmlFor="to">終了日</label>
                    <input
                        id="to"
                        type="date"
                        value={pageState.displayRange.to}
                        onChange={(e) =>
                            pageStateDispatch.setTo(e.target.value)
                        }
                    />

                    <label htmlFor="base">基準日</label>
                    <input
                        id="base"
                        type="date"
                        value={pageState.baseDate}
                        onChange={(e) =>
                            pageStateDispatch.setBaseDate(e.target.value)
                        }
                    />
                </div>

                {/* ガントチャート本体 */}
                <div className={styles.table_wrapper}>
                    <ProjectProgressGrid
                        dates={dates}
                        tasks={pageState.tasks}
                        baseDate={pageState.baseDate}
                        projectId={projectId}
                        pageStateDispatch={pageStateDispatch}
                        editDispatch={editDispatch}
                        selectors={selectors}
                    />
                </div>
            </div>
        </div>
    );
};
