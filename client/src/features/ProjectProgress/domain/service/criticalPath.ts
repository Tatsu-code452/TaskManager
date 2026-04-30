import { TaskModel } from "../../components/cell";

export const calcCriticalPath = (tasks: TaskModel[]) => {
    // フェーズごとにグループ化
    const byPhase: Record<string, TaskModel[]> = {};

    tasks.forEach((t) => {
        if (!byPhase[t.phase]) byPhase[t.phase] = [];
        byPhase[t.phase].push(t);
    });

    const criticalTaskIds = new Set<string>();

    Object.values(byPhase).forEach((phaseTasks) => {
        // 計画終了日が最も遅いタスクをクリティカル扱い
        const critical = phaseTasks.reduce((a, b) =>
            a.plan.end > b.plan.end ? a : b
        );
        criticalTaskIds.add(critical.id);
    });

    return criticalTaskIds;
};