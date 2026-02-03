import React from "react";
import { Entity, DataItem } from "../../const/const";
import { useDataCreateForm } from "../../hooks/crud/useDataCreateForm";
import { useEffectsSuccess } from "../../hooks/useEffectsSuccess";
import { useRefreshList } from "../../hooks/crud/useRefreshList";

export interface DataCreateFormProps {
    newId: string;
    newName: string;
    payloadJson: string;
    entity: Entity;
    setItems: React.Dispatch<React.SetStateAction<DataItem[]>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setApiResult: React.Dispatch<React.SetStateAction<string | null>>;
    isFetching: React.RefObject<boolean>;
}

// データ作成フォームコンポーネント
const DataCreateForm = (props: DataCreateFormProps) => {
    const {
        newId,
        newName,
        payloadJson,
        entity,
        setItems,
        setSelectedId,
        setApiResult,
        isFetching,
    } = props;

    const effectsSuccess = useEffectsSuccess({
        onResult: setApiResult,
        onClearSelection: () => setSelectedId(null),
    });

    const effectsRefresh = useRefreshList({
        onItemsUpdated: setItems,
        isFetching,
    });

    const { create, createAuto } = useDataCreateForm({
        newId,
        newName,
        payloadJson,
        entity,
        effectsSuccess,
        effectsRefresh,
    });

    return (
        <>
            <button
                className="button primary"
                disabled={isFetching.current}
                onClick={create}
            >
                作成
            </button>
            <button
                className="button secondary"
                disabled={isFetching.current}
                onClick={createAuto}
            >
                自動作成
            </button>
        </>
    );
};

export default React.memo(DataCreateForm);
