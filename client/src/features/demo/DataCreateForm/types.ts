import { useDataCreateFormHandler } from "./useDataCreateFormHandler";

export interface DataCreateFormProps {
    loading: boolean;
    onCreate: () => void;
    onCreateAuto: () => void;
}

export type DataCreateFormHandler = ReturnType<typeof useDataCreateFormHandler>