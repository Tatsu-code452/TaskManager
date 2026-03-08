import { useCallback, useEffect, useMemo, useRef } from "react";
import { AllocationResult } from "../../domain/allocate";
import { TaskMatrixValue } from "../../types/model";
import { EditTarget } from "../../types/types";
import { useCellKeyboardNavigation } from "../handler/useCellKeyboardNavigation";
import { useTaskAllocate } from "../handler/useTaskAllocate";
import { useTaskCalc } from "../handler/useTaskCalc";
import { useTaskService } from "../handler/useTaskService";
import { useProgressStates } from "../state/useProgressStates";

export const useProgressPageController = () => {
    // 依存ファイル取り込み
    const { pageState, editTarget,
        dispatch,
        setEditTarget,
    } = useProgressStates();
    const { fetchTasks, createTasks, updateTask, updateCell } = useTaskService();
    const { calcDates } = useTaskCalc();
    const { isStartEdit, getNextCell } = useCellKeyboardNavigation();
    const { allocatePlannedHours } = useTaskAllocate();

    // 初期表示(StrictMode回避)
    const isFetching = useRef(false);
    const load = useCallback(async () => {
        const tasks = await fetchTasks(pageState.displayRange, pageState.baseDate);
        dispatch.setTasks(tasks);
    }, [fetchTasks, dispatch, pageState.displayRange, pageState.baseDate]);

    useEffect(() => {
        if (!isFetching.current) {
            isFetching.current = true;
            load()
        }
    }, [load]);

    // 日付配列
    const dates = useMemo(() => calcDates(pageState.displayRange),
        [calcDates, pageState.displayRange]);

    // セルデータ変更ハンドラ
    const handleChangeCell = async (target: EditTarget, newValue: number) => {
        const task = pageState.tasks.find(t => t.id === target.taskIndex);
        if (!task) return;

        if (target.type === "actualProgress") {
            await updateTask(target.taskIndex, task.phase, task.name, newValue);
        } else {
            const type = target.type === "planCell" ? "plan" : "actual";
            await updateCell(target.taskIndex, type, target.date, newValue);
        }

        await load();
    };

    // セル編集開始
    const startEdit = (
        taskIndex: string,
        type: EditTarget["type"],
        date?: string,
        pressedKey?: string
    ) => {
        setEditTarget(
            type === "actualProgress"
                ? { type, taskIndex, pressedKey }
                : { type, taskIndex, date, pressedKey }
        );
    }
    // セル編集終了
    const cancelEdit = () => setEditTarget(null);

    // キーボード入力時処理ハンドラ
    const handleKeyDownCell: React.KeyboardEventHandler<HTMLTableCellElement> = (e) => {
        const td = e.currentTarget;
        const { type, taskIndex, date } = td.dataset;

        if (!type) return;

        const editType = type as EditTarget["type"];

        // 編集開始
        if (isStartEdit(e)) {
            e.preventDefault();
            startEdit(taskIndex, editType, date, e.key);
            return;
        }

        // フォーカス移動
        const next = getNextCell(
            e,
            { type: editType, taskIndex, date: date ?? undefined },
            pageState.tasks,
            dates
        );
        if (next) {
            e.preventDefault();

            if (next.type === "actualProgress") {
                startEdit(next.taskIndex, next.type);
            } else {
                startEdit(next.taskIndex, next.type, next.date);
            }
        }
    };

    const handleAllocate = () => {
        pageState.tasks.forEach(task => {
            // [date: string]: number;
            const allocated: AllocationResult = allocatePlannedHours(
                task.plan.start,
                task.plan.end,
                task.plan.totalHours,
            );
            const newCells: TaskMatrixValue[] = [];
            Object.entries(allocated).map(([date, value]) => {
                newCells.push({ date, value });
            })
            task.plan.cells = newCells;
        });
        dispatch.setTasks(pageState.tasks);
    }

    const handleCreateTasks = async (value: string) => {
        const lines = value
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        const tasks = [];

        for (const [index, line] of lines.entries()) {
            const values = line.split(",").map(v => v.trim());

            // --- カラム数チェック ---
            if (values.length !== 5) {
                throw new Error(
                    `行 ${index + 1} のカラム数が不正です（${values.length}）。5 カラム必要です。\n内容: ${line}`
                );
            }

            const [phase, name, planned_start, planned_end, progress] = values;

            // --- 日付バリデーション ---
            if (!isValidDate(planned_start)) {
                throw new Error(`行 ${index + 1}: planned_start が不正な日付です → ${planned_start}`);
            }
            if (!isValidDate(planned_end)) {
                throw new Error(`行 ${index + 1}: planned_end が不正な日付です → ${planned_end}`);
            }

            // --- 数値バリデーション ---
            const actual_progress = Number(progress);
            if (Number.isNaN(actual_progress)) {
                throw new Error(`行 ${index + 1}: actual_progress が数値ではありません → ${progress}`);
            }

            tasks.push({
                phase,
                name,
                planned_start,
                planned_end,
                actual_progress,
            });
        }

        await createTasks(tasks);
    };

    // --- 日付バリデーション関数 ---
    const isValidDate = (str: string) => {
        const d = new Date(str);
        return !Number.isNaN(d.getTime());
    };

    return {
        pageState, editTarget,
        dispatch,
        dates,
        startEdit, cancelEdit,
        handleChangeCell, handleKeyDownCell,
        handleAllocate, handleCreateTasks,
    }
}