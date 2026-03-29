import { TaskModel } from "../../types/model";

export const useCollapsedPhases = (
    {
        tasks,
        collapsedPhases,
        setCollapsedPhases,
    }: {
        tasks: TaskModel[];
        collapsedPhases: Record<string, boolean>;
        setCollapsedPhases: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    }
) => {
    const allCollapsed = Object.values(collapsedPhases).every(v => v === true);

    const togglePhase = (phase: string) => {
        setCollapsedPhases(prev => ({
            ...prev,
            [phase]: !prev[phase],
        }));
    };

    const toggleAllPhases = () => {
        setCollapsedPhases(prev => {
            const isEmpty = Object.keys(prev).length === 0;

            if (allCollapsed || isEmpty) {
                const opened: Record<string, boolean> = {};
                tasks.forEach(t => opened[t.phase] = false);
                return opened;
            }

            const collapsed: Record<string, boolean> = {};
            tasks.forEach(t => collapsed[t.phase] = true);
            return collapsed;
        });
    };

    return {
        allCollapsed,toggleAllPhases, togglePhase,
    }
}