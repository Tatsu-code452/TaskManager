import { useAsyncGuard } from "../../../../utils/useAsyncGuard";
import { taskUseCase } from "../../domain/service/taskUseCase";

export const useTaskService = () => {
    const useCase = taskUseCase();
    const { run: listTasks } = useAsyncGuard(useCase.listTasks);
    const { run: createTask } = useAsyncGuard(useCase.createTask);
    const { run: updateTask } = useAsyncGuard(useCase.updateTask);
    const { run: deleteTask } = useAsyncGuard(useCase.deleteTask);
    const { run: bulkCreateTask } = useAsyncGuard(useCase.createTasks);
    return {
        listTasks,
        createTask,
        updateTask,
        deleteTask,
        bulkCreateTask,
    };
};