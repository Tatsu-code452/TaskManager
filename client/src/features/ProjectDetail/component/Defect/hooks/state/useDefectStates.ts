import { DefectPayload, DefectRow } from "@comtypes/db/defect";
import { useModal } from "@hooks/useModal";
import { useStateObj } from "@hooks/useStateObj";

export const useDefectStates = () => {
    const { dispatch: defect } = useStateObj<DefectRow[]>([]);
    const { dispatch: modal } = useModal<DefectPayload, string>();

    return {
        defect,
        modal,
    };
};