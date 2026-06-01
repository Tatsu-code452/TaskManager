import { TaskPayload, TaskRow } from "@comtypes/db/task";
import { useModal } from "@hooks/useModal";
import { useStateObj } from "@hooks/useStateObj";

export const useTaskStates = () => {
    const { dispatch: tasks } = useStateObj<TaskRow[]>([]);
    const { dispatch: modal } = useModal<TaskPayload, string>();

    return {
        tasks,
        modal,
    };
};