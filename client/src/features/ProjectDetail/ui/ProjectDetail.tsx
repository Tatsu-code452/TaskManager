import { useParams, useSearchParams } from "react-router-dom";
import { useMilestoneStates } from "../hooks/state/useMilestoneStates";
import styles from "./ProjectDetail.module.css";
import { MilestoneTab } from "./milestone/MilestoneTab";

const TABS = ["overview", "milestone", "wbs", "issue", "defect"] as const;
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
                {/* {tab === "wbs" && <WbsTab />}
                {tab === "issue" && <IssueTab />}
                {tab === "defect" && <DefectTab />} */}
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
};
