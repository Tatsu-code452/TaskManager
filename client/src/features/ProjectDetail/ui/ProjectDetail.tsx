import { useParams, useSearchParams } from "react-router-dom";
import { ProjectProgressPage } from "../../ProjectProgress/ui/ProjectProgressPage";
import { useDefectStates } from "../hooks/state/useDefectStates";
import { useIssueStates } from "../hooks/state/useIssueStates";
import { useMilestoneStates } from "../hooks/state/useMilestoneStates";
import { useTaskStates } from "../hooks/state/useTaskStates";
import styles from "./ProjectDetail.module.css";
import { DefectTab } from "./defect/DefectTab";
import { IssueTab } from "./issue/IssueTab";
import { MilestoneTab } from "./milestone/MilestoneTab";
import { TaskTab } from "./task/TaskTab";

const TABS = [
    "overview",
    "milestone",
    "wbs",
    "issue",
    "defect",
    "gantt",
] as const;
type Tab = (typeof TABS)[number];

export const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [params, setParams] = useSearchParams();
    const tab = (params.get("tab") as Tab) ?? "milestone";
    const projectId = id;
    const changeTab = (t: Tab) => {
        params.set("tab", t);
        setParams(params);
    };

    const milestoneStates = useMilestoneStates();
    const taskStates = useTaskStates();
    const issueStates = useIssueStates();
    const defectStates = useDefectStates();

    return (
        <div>
            <div className={styles.tabs}>
                {TABS.map((t) => (
                    <button
                        key={t}
                        className={tab === t ? styles.active : ""}
                        onClick={() => changeTab(t)}
                    >
                        {TAB_LABELS[t]}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                {/* {tab === "overview" && <OverviewTab />} */}
                {tab === "milestone" && (
                    <MilestoneTab
                        projectId={projectId}
                        states={milestoneStates}
                    />
                )}
                {tab === "wbs" && (
                    <TaskTab projectId={projectId} states={taskStates} />
                )}
                {tab === "issue" && (
                    <IssueTab projectId={projectId} states={issueStates} />
                )}
                {tab === "defect" && (
                    <DefectTab projectId={projectId} states={defectStates} />
                )}
                {tab === "gantt" && (
                    <ProjectProgressPage projectId={projectId} />
                )}
            </div>
        </div>
    );
};

const TAB_LABELS: Record<Tab, string> = {
    overview: "概要",
    milestone: "マイルストーン",
    wbs: "フェーズ & WBS",
    issue: "課題",
    defect: "欠陥",
    gantt: "ガントチャート",
};
