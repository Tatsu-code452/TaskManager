import { useDataEditHandler } from "./useDataEditHandler";

export interface DataEditProps {
    selectedId: number | null;
    loading: boolean;
    onDelete: (id: number) => void;
    onUpdate: () => void;
    onUpdateAuto: () => void;
}

export type DataEditHandler = ReturnType<typeof useDataEditHandler>;