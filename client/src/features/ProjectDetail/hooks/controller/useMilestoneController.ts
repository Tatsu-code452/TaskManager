import { useCallback, useEffect } from "react";
import { milestoneApi } from "../../../../api/tauri/milestoneApi";
import { MilestoneStatus } from "../../../../types/db/milestone";
import { Milestone, toMilestone, toMilestonePayload } from "../../types/milestone";
import { MilestoneStates } from "../state/useMilestoneStates";

export const useMilestoneController = (projectId: string, states: MilestoneStates) => {
    const {
        setMilestones,
        loading,
        setLoading,
        editingMilestone,
        setShowModal,
        setMode,
        setEditingMilestone,
    } = states;


    const validate = (data: Milestone): string[] => {
        const errors: string[] = [];

        if (!data.name || data.name.trim() === "") {
            errors.push("名称は必須です");
        }

        if (data.plannedStartDate && data.plannedEndDate) {
            if (data.plannedStartDate > data.plannedEndDate) {
                errors.push("開始予定日は終了予定日より前である必要があります");
            }
        }

        if (data.actualStartDate && data.actualEndDate) {
            if (data.actualStartDate > data.actualEndDate) {
                errors.push("開始実績日は終了実績日より前である必要があります");
            }
        }

        return errors;
    };

    const load = useCallback(async () => {
        const list = await milestoneApi.list(projectId);
        setMilestones(list.map(toMilestone));
        setLoading(false);
    }, [projectId]);

    const create = useCallback(async () => {
        const errors = validate(editingMilestone);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        await milestoneApi.create(toMilestonePayload(editingMilestone));
        await load();
    }, [load]);

    const update = useCallback(async () => {
        const errors = validate(editingMilestone);
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
        await milestoneApi.update(toMilestonePayload(editingMilestone));
        await load();
    }, [load]);

    const remove = useCallback(async (id: string) => {
        if (!confirm("削除しますか？")) return;
        await milestoneApi.delete(projectId, id);
        await load();
    }, [projectId, load]);

    // strict mode回避
    useEffect(() => {
        if (loading) return;
        try {
            setLoading(true);
            load();
        } finally {
            setLoading(false);
        }
    }, [load]);

    const handleChange = (key: keyof Milestone, value: string | number) => {
        if (!editingMilestone) return;
        setEditingMilestone({ ...editingMilestone, [key]: value })
    }

    const handleShowModal = (mode: "new" | "edit", milestone: Milestone) => {
        setMode(mode);
        if (mode === "new") {
            milestone = {
                id: "",
                projectId,
                name: "",
                plannedStartDate: "",
                plannedEndDate: "",
                actualStartDate: "",
                actualEndDate: "",
                status: MilestoneStatus.NotStarted,
            }
        }
        setEditingMilestone(milestone);
        setShowModal(true);
    }

    return {
        load, create, update, remove,
        handleChange, handleShowModal
    };
};