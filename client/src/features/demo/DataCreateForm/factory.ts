import { DataCreateFormHandler, DataCreateFormProps } from "./types";

export const createDataCreateFormProps = (
    dataCreateFormHandler: DataCreateFormHandler,
): DataCreateFormProps => ({
    loading: dataCreateFormHandler.loading,
    onCreate: dataCreateFormHandler.handleCreate,
    onCreateAuto: dataCreateFormHandler.handleCreateAuto,
});
