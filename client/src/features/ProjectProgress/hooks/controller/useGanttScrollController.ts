import { useCallback, useMemo, useState } from "react";

const CELL_WIDTH = 40;
const LEFT_CELLS_WIDTH = 40 * 20;
const BUFFER_CELL_NUM = 50;

export const useGanttScrollController = (dates: string[]) => {
    const [scrollLeft, setScrollLeft] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const handleScroll = useCallback(
        (e: React.UIEvent<HTMLDivElement>) => {
            setScrollLeft(e.currentTarget.scrollLeft);

            const scrollLeftForGantt = Math.max(
                0,
                scrollLeft - LEFT_CELLS_WIDTH,
            );
            const offset = scrollLeftForGantt % CELL_WIDTH;
            const snapped = scrollLeftForGantt - offset;

            setStartIndex(Math.max(0, snapped / CELL_WIDTH));
        },
        [scrollLeft],
    );

    const visibleDates = useMemo(
        () => {
            const endIndex = Math.min(dates.length, startIndex + BUFFER_CELL_NUM);
            if (dates.length < startIndex) {
                setScrollLeft(0);
                setStartIndex(0);
                return dates.slice(0, endIndex)
            }
            return dates.slice(startIndex, endIndex)
        },
        [dates, startIndex],
    );
    const offsetPx = startIndex * CELL_WIDTH;

    return {
        handleScroll,
        visibleDates,
        offsetPx,
    }
}