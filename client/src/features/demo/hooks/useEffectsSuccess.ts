import { success as notifySuccess } from "../../../utils/notify";
import { Entity } from "../const/const";

export const useEffectsSuccess = ({
    onResult,
    onClearSelection,
}: {
    onResult: (json: string) => void;
    onClearSelection: () => void;
}) => {
    const handleSuccess = async (entity: Entity, res: any, action: string) => {
        onResult(JSON.stringify(res, null, 2));
        notifySuccess(`${entity} ${action} 成功`);
        onClearSelection();
    };

    return { handleSuccess };
};