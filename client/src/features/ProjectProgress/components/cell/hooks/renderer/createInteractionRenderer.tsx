import React, { useCallback } from "react";
import CellInteraction from "../../ui/CellInteraction";

export const useInteractionRenerer = () =>
    useCallback(
        (
            date: string,
            createRef: (el: HTMLElement | null) => void,
            handlePointerDown: (e: React.PointerEvent) => void,
            handleStartEdit: () => void,
            handleUpdateCurrentData: () => void,
        ) => (
            <CellInteraction
                date={date}
                ref={createRef}
                onPointerDown={handlePointerDown}
                onClick={handleStartEdit}
                onPointerEnter={handleUpdateCurrentData}
            />
        ),
        [],
    );
