import { useEffect } from "react";
import { recalcTask } from "../domain/calc";
import { eachDay } from "../domain/dateUtils";
import { toTaskModel } from "../domain/toTaskModel";
import { useProgressStates } from "./useProgressStates";
import { useTaskService } from "./useTaskService";

type EditTarget =
    |
    {
        type: "actualProgress",
        taskIndex: string,
    }
    |
    {
        type: "planCell",
        taskIndex: string,
        date: string,
    }
    |
    {
        type: "actualCell",
        taskIndex: string,
        date: string,
    }


export const useProgressPageController = () => {
    const { state, edit, editState, setEdit, } = useProgressStates();

    const taskService = useTaskService();

    useEffect(() => {
        const load = async () => {
            const tasks = await taskService.fetchTasks(state.displayRange);
            editState.setTasks(tasks.map((task) => toTaskModel(task, state.baseDate)));
        };
        load();
    }, []);

    const dates = () => eachDay(state.displayRange.from, state.displayRange.to)

    const updateTask = (target: EditTarget, newValue: number) => {
        return state.tasks.map((task, idx) => {
            if (idx !== ("taskIndex" in target ? target.taskIndex : -1))
                return task;

            if (target.type === "planCell") {
                const planCells = task.plan.cells.map((cell) =>
                    cell.date === target.date ? { ...cell, value: newValue } : cell,
                );
                return recalcTask({ ...task, plan: { ...task.plan, cells: planCells } }, state.baseDate);
            }

            if (target.type === "actualCell") {
                const actualCells = task.actual.cells.map((cell) =>
                    cell.date === target.date ? { ...cell, value: newValue } : cell,
                );
                return recalcTask({ ...task, actual: { ...task.actual, cells: actualCells } }, state.baseDate);
            }

            if (target.type === "actualProgress") {
                return recalcTask(
                    { ...task, actual: { ...task.actual, progress: newValue } },
                    state.baseDate,
                );
            }

            return task;
        });

    }
    const handleChangeCell = (target: EditTarget, newValue: number) => {
        editState.setTasks(updateTask(target, newValue));
    };

    const handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement> = (e) => {
        const td = e.currentTarget;
        const dataset = td.dataset;
        if (!dataset.type) return;

        if (
            e.key === "F2" ||
            (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey)
        ) {
            e.preventDefault();
            const taskIndex = Number(dataset.taskIndex);
            if (dataset.type === "planCell" && dataset.date) {
                setEdit({ type: "planCell", taskIndex, date: dataset.date });
            } else if (dataset.type === "actualCell" && dataset.date) {
                setEdit({ type: "actualCell", taskIndex, date: dataset.date });
            } else if (dataset.type === "actualProgress") {
                setEdit({ type: "actualProgress", taskIndex });
            }
        }
    };

    return {
        state, edit,
        editState, setEdit,
        dates,
        handleChangeCell, handleKeyDownCell,
    }
}