import { DefectTab } from "@features/ProjectDetail/component/Defect/DefectTab";
import { IssueTab } from "@features/ProjectDetail/component/Issue/IssueTab";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import commonStyles from "../../../common.module.css";
import { Button } from "../../../components";
import { ProjectProgressPage } from "../../ProjectProgress/ui/ProjectProgressPage";
import { MilestoneTab } from "../component/Milestone/MilestoneTab";
import { PhaseTab } from "../component/Phase/PhaseTab";
import { useTaskStates } from "../hooks/state/useTaskStates";
import styles from "./ProjectDetail.module.css";
import { TaskTab } from "./task/TaskTab";

const TABS = [
    "overview",
    "milestone",
    "phase",
    "task",
    "issue",
    "defect",
    "gantt",
] as const;
type Tab = (typeof TABS)[number];
// [プロジェクト全体進捗バー]

// [マイルストーン進捗サマリー]   [フェーズ進捗サマリー]

// [WBS 進捗 / タスク状況]          [課題・欠陥のステータス]

// [直近の重要イベント]             [遅延アラート]

export const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [params, setParams] = useSearchParams();
    const tab = (params.get("tab") as Tab) ?? "milestone";
    const projectId = id;
    const changeTab = (t: Tab) => {
        params.set("tab", t);
        setParams(params);
    };

    const taskStates = useTaskStates();

    const navigation = useNavigate();

    return (
        <div className={commonStyles.container}>
            <div className={styles.tabs}>
                <Button onClick={() => navigation(`/`)}>案件一覧</Button>
                {TABS.map((t) => (
                    <Button
                        key={t}
                        className={tab === t ? styles.active : ""}
                        onClick={() => changeTab(t)}
                    >
                        {TAB_LABELS[t]}
                    </Button>
                ))}
            </div>

            <div className={styles.content}>
                {/* {tab === "overview" && <OverviewTab />} */}
                {tab === "milestone" && <MilestoneTab projectId={projectId} />}
                {tab === "phase" && <PhaseTab projectId={projectId} />}
                {tab === "task" && (
                    <TaskTab projectId={projectId} states={taskStates} />
                )}
                {tab === "issue" && <IssueTab projectId={projectId} />}
                {tab === "defect" && <DefectTab projectId={projectId} />}
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
    phase: "フェーズ",
    task: "WBS",
    issue: "課題",
    defect: "欠陥",
    gantt: "ガントチャート",
};
