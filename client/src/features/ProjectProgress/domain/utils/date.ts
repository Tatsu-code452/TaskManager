export const calcDiffDays = (a: string, b: string) => {
    return Math.round((
        new Date(b).getTime() - new Date(a).getTime()
    ) / (1000 * 60 * 60 * 24));
};

export const shiftDate = (date: string, diff: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0, 10);
};

export const toDate = (d?: string) =>
    d ? new Date(d + "T00:00:00").getTime() : null;

export const formatDate = (d: Date): string =>
    d.toISOString().slice(0, 10);

export const toFirstDateOnMonth = (d: Date): Date => {
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), 1));
};
