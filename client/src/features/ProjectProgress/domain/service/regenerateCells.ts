import { calcDiffDays, shiftDate } from "../utils/date";

export const regenerateCells = async (
    updateApi: (taskId: string, date: string, hours: number) => Promise<unknown>,
    taskId: string,
    start: string,
    end: string,
    totalHours: number
) => {
    const days = calcDiffDays(start, end);

    const perDay = totalHours / days;

    for (let i = 0; i < days; i++) {
        const date = shiftDate(start, i)
        await updateApi(taskId, date, perDay);
    }
};