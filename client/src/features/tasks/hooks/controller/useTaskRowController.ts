import Task from "../../../../types/task.interface";
import { taskToViewData } from "../../domain/mapping/taskToViewData";

export const useTaskRowController = (
    task: Task,
    onEdit: () => void,
    onDelete: () => void,
) => {
    return {
        vm: taskToViewData(task),
        handleEdit: onEdit,
        handleDelete: onDelete,
    }
}
