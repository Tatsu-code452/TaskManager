export const shiftDate = (date: string, diff: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + diff);
    return d.toISOString().slice(0, 10);
};