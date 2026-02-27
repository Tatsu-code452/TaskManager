import Task from "../../../../types/task.interface";
import { createEmptyTask } from "../logic/createEmptyTask";
import { csvToTaskForms } from "../mapping/csvToEditForms";
import { taskToPatch } from "../mapping/taskToPatch";
import { taskUseCase } from "./taskUseCase";

export const csvUseCase = () => {
    const crudUseCase = taskUseCase();

    const importTasks = async (text: string): Promise<{ tasks: Task[], errors: string[] }> => {
        const { forms, errors: parseErrors } = csvToTaskForms(text);

        if (parseErrors.length > 0) {
            return { tasks: null, errors: parseErrors };
        }

        const patches = forms.map((f) =>
            taskToPatch(createEmptyTask(), f)
        );

        const res = await crudUseCase.createTasks(patches);

        if (!res.success || res.type !== "bulkCreate") {
            return { tasks: null, errors: ["登録に失敗しました"] };
        }

        return { tasks: res.tasks, errors: [] };
    };

    return {
        importTasks,
    }
}