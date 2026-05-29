import { MilestonePayload, MilestoneRow } from "@comtypes/db/milestone";
import { useModal } from "@hooks/useModal";
import { useStateObj } from "@hooks/useStateObj";

export const useMilestoneStates = () => {
    const { dispatch: milestones } = useStateObj<MilestoneRow[]>([]);
    const { dispatch: modal } = useModal<MilestonePayload, string>();

    return {
        milestones,
        modal,
    };
};