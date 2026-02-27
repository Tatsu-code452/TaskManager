import Task from "../../../../types/task.interface";
import { toErrorMessage } from "../../../../utils/notify";
import { Response, SuccessResponse } from "../../types/typeResponse";
import { taskApi } from "./taskApi";

export const taskUseCase = () => {

    const ok = <T extends SuccessResponse>(res: T): Response => ({
        success: true, ...res,
    });

    const fail = (err: unknown): Response => {
        const msg = toErrorMessage(err);
        return { success: false, type: "error", error: msg };
    };

    const listTasks = async (): Promise<Response> => {
        try {
            const tasks = await taskApi.listTasks();
            return ok({ type: "list", tasks });
        } catch (err) {
            return fail(err);
        }
    }

    const createTask = async (task: Partial<Task>): Promise<Response> => {
        try {
            const created = await taskApi.createTask(task);
            return ok({ type: "create", task: created });
        } catch (err) {
            return fail(err);
        }
    }

    const createTasks = async (tasks: Partial<Task>[]): Promise<Response> => {
        try {
            const created = await taskApi.createTasks(tasks);
            return ok({ type: "bulkCreate", tasks: created });
        } catch (err) {
            return fail(err);
        }
    }

    const updateTask = async (id: number, task: Partial<Task>): Promise<Response> => {
        try {
            const updated = await taskApi.updateTask(id, task);
            return ok({ type: "update", task: updated });
        } catch (err) {
            return fail(err);
        }
    }

    const deleteTask = async (id: number): Promise<Response> => {
        try {
            await taskApi.deleteTask(id);
            return ok({ type: "delete" });
        } catch (err) {
            return fail(err);
        }
    }

    return {
        listTasks,
        createTask, createTasks,
        updateTask,
        deleteTask,
    };
};