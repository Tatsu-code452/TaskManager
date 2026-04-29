import { useCallback, useMemo, useState } from "react";

const CELL_WIDTH = 40;
const LEFT_CELLS_WIDTH = 640;

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
        () => dates.slice(startIndex, startIndex + 50),
        [dates, startIndex],
    );
    const offsetPx = startIndex * CELL_WIDTH;

    return {
        handleScroll,
        visibleDates,
        offsetPx,
    }
}