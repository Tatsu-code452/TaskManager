export const formatDate = (d: Date): string => d.toISOString().slice(0, 10);

export const eachDay = (from: string, to: string): string[] => {
    const res: string[] = [];
    let cur = from;
    while (cur <= to) {
        res.push(cur);
        cur = addDays(cur, 1);
    }
    return res;
};

export const addDays = (ymd: string, diff: number): string => {
    const d = new Date(ymd);
    d.setDate(d.getDate() + diff);
    return formatDate(d);
};

export const getMonthLabel = (ymd: string): string => {
    const d = new Date(ymd);
    return `${d.getMonth() + 1}月`;
};

export const getDayLabel = (ymd: string): string => {
    const d = new Date(ymd);
    return `${d.getDate()}`;
};