import React from "react";
import { useDataCreateFormHandler } from "./useDataCreateFormHandler";
import { DataCreateFormProps } from "./types";

// データ作成フォームコンポーネント
const DataCreateForm = (props: DataCreateFormProps) => {
    const {
        newId,
        newName,
        payloadJson,
        entity,
        setItems,
        setSelectedId,
        isFetching,
        setIsFetching,
    } = props;

    const { handleCreate, handleCreateAuto } = useDataCreateFormHandler({
        setSelectedId,
        isFetching,
        setIsFetching,
        newId,
        newName,
        payloadJson,
        entity,
        setItems,
    });

    return (
        <>
            <button
                className="button primary"
                disabled={isFetching}
                onClick={handleCreate}
            >
                作成
            </button>
            <button
                className="button secondary"
                disabled={isFetching}
                onClick={handleCreateAuto}
            >
                自動作成
            </button>
        </>
    );
};

export default React.memo(DataCreateForm);
