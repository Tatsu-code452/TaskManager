import { GanttDrag } from "../../cell";

export type TooltipState = {
    from: string;
    to: string;
    mode: "move" | "resize";
    edge?: "start" | "end" | undefined;
    x: number;
    y: number;
    visible: boolean;
};

export type TooltipApi = {
    state: TooltipState;
    preview: (drag: GanttDrag, e: React.PointerEvent) => void;
    hide: () => void;
}

