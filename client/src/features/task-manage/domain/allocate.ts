export interface AllocationResult {
    [date: string]: number;
}

export const allocate = () => {
    // type DateString = `${number}-${number}-${number}`;


    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const getDateRange = (start: Date, end: Date): Date[] => {
        const dates: Date[] = [];
        const d = new Date(start);
        while (d <= end) {
            dates.push(new Date(d));
            d.setDate(d.getDate() + 1);
        }
        return dates;
    };

    const holidayBase = ["2026-01-01", "2026-01-03", "2026-01-04", "2026-01-10", "2026-01-11", "2026-01-12", "2026-01-17", "2026-01-18", "2026-01-24", "2026-01-25", "2026-01-31",
        "2026-02-01", "2026-02-07", "2026-02-08", "2026-02-11", "2026-02-14", "2026-02-15", "2026-02-21", "2026-02-22", "2026-02-23", "2026-02-28",
        "2026-03-01", "2026-03-07", "2026-03-08", "2026-03-14", "2026-03-15", "2026-03-20", "2026-03-21", "2026-03-22", "2026-03-28", "2026-03-19"]
    /**
     * @param holidays 祝日一覧（YYYY-MM-DD の配列）
     */
    const allocatePlannedHours = (
        start: string,
        end: string,
        plannedHours: number,
        maxPerDay: number = 7,
        holidays: string[] = holidayBase
    ): AllocationResult => {
        const s = new Date(start);
        const e = new Date(end);

        const allDates = getDateRange(s, e);

        // 稼働日のみ抽出（平日 + 祝日除外）
        const workingDates = allDates.filter(d => {
            const key = d.toISOString().slice(0, 10);
            return !isWeekend(d) && !holidays.includes(key);
        });

        if (workingDates.length === 0) return {};

        const result: AllocationResult = {};
        let remaining = plannedHours;

        workingDates.forEach((d, i) => {
            const key = d.toISOString().slice(0, 10);

            // 最終日は残り全部
            if (i === workingDates.length - 1) {
                result[key] = remaining;
                return;
            }

            // 均等割りの基本値
            const idealDaily = plannedHours / workingDates.length;

            // 最大工数制限
            const today = Math.min(idealDaily, maxPerDay, remaining);

            result[key] = Number(today.toFixed(2));
            remaining -= today;
        });

        return result;
    };

    const allocatePlannedHoursFrontLoad = (
        start: string,
        end: string,
        plannedHours: number,
        maxPerDay: number = 7,
        holidays: string[] = holidayBase
    ): AllocationResult => {
        const s = new Date(start);
        const e = new Date(end);

        const allDates = getDateRange(s, e);

        // 稼働日のみ抽出（平日 + 祝日除外）
        const workingDates = allDates.filter(d => {
            const key = d.toISOString().slice(0, 10);
            return !isWeekend(d) && !holidays.includes(key);
        });

        if (workingDates.length === 0) return {};

        const result: AllocationResult = {};
        let remaining = plannedHours;

        workingDates.forEach((d, i) => {
            const key = d.toISOString().slice(0, 10);

            if (remaining === 0) return;

            // 最終日は残り全部
            if (i === workingDates.length - 1) {
                result[key] = remaining;
                return;
            }

            // 基本値
            const idealDaily = maxPerDay;

            // 最大工数制限

            const today = Math.min(idealDaily, maxPerDay, remaining);

            result[key] = Number(today.toFixed(2));
            remaining -= today;
        });

        return result;
    };

    return {
        none: allocatePlannedHours,
        allocatePlannedHours: allocatePlannedHoursFrontLoad
    }
}