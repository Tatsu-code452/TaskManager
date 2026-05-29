import { PhasePayload, PhaseRow } from "@comtypes/db/phase";
import { useModal } from "@hooks/useModal";
import { useStateObj } from "@hooks/useStateObj";

export const usePhaseStates = () => {
    // tab
    const { dispatch: phases } = useStateObj<PhaseRow[]>([]);
    const { dispatch: modal } = useModal<PhasePayload, string>();

    return {
        phases,
        modal
    };
};