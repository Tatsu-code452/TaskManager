export const regenerateCells = async (
    updateApi: (taskId: string, date: string, hours: number) => Promise<unknown>,
    taskId: string,
    start: string,
    end: string,
    totalHours: number
) => {
    const days =
        (new Date(end).getTime() - new Date(start).getTime()) /
        (1000 * 60 * 60 * 24) + 1;

    const perDay = totalHours / days;

    for (let i = 0; i < days; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        const date = d.toISOString().slice(0, 10);

        await updateApi(taskId, date, perDay);
    }
};