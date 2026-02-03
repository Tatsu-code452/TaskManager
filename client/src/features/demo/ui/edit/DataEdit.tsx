import React from "react";
import { Entity, DataItem } from "../../const/const";
import { useDataEdit } from "../../hooks/crud/useDataEdit";
import { useEntityEffects } from "../../hooks/crud/useEntityEffects";

export interface DataEditProps {
    selectedId: number | null;
    newName: string;
    payloadJson: string;
    entity: Entity;
    setItems: React.Dispatch<React.SetStateAction<DataItem[]>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setApiResult: React.Dispatch<React.SetStateAction<string | null>>;
    isFetching: React.RefObject<boolean>;
}

// データ編集コンポーネント
const DataEdit = (props: DataEditProps) => {
    const {
        selectedId,
        newName,
        payloadJson,
        entity,
        setItems,
        setSelectedId,
        setApiResult,
        isFetching,
    } = props;
    const effects = useEntityEffects({
        onItemsUpdated: setItems,
        onResult: setApiResult,
        onClearSelection: () => setSelectedId(null),
        isFetching,
    });
    const { update, updateAuto, deleteId } = useDataEdit({
        selectedId,
        newName,
        payloadJson,
        entity,
        effects,
    });

    return (
        <>
            <div className="form-row">
                <button
                    type="button"
                    className="button primary"
                    onClick={update}
                >
                    選択を更新
                </button>
                <button
                    type="button"
                    className="button secondary"
                    onClick={updateAuto}
                >
                    自動更新
                </button>
                <span className="small-note">
                    選択ID: {selectedId ?? "(なし)"}
                </span>
            </div>
            <div className="form-row">
                <button
                    type="button"
                    className="button warn"
                    onClick={deleteId}
                >
                    選択を削除
                </button>
            </div>
        </>
    );
};
export default React.memo(DataEdit);
