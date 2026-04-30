import { TaskModel } from "../components/cell";

export interface ProgressPageState {
    displayRange: DisplayRange;
    baseDate: string;
    tasks: TaskModel[];
}

export interface DisplayRange {
    from: string;
    to: string;
}