import React from "react";
import { useDataEditHandler } from "./useDataEditHandler";
import { DataEditProps } from "./types";

// データ編集コンポーネント
const DataEdit = (props: DataEditProps) => {
    const {
        selectedId,
        setSelectedId,
        isFetching,
        setIsFetching,
        newName,
        payloadJson,
        entity,
        setItems,
    } = props;
    const { handleDelete, handleUpdate, handleUpdateAuto } = useDataEditHandler({
        selectedId,
        setSelectedId,
        isFetching,
        setIsFetching,
        newName,
        payloadJson,
        entity,
        setItems,
    });

    return (
        <>
            <div className="form-row">
                <button
                    type="button"
                    className="button primary"
                    disabled={isFetching}
                    onClick={handleUpdate}
                >
                    選択を更新
                </button>
                <button
                    type="button"
                    className="button secondary"
                    disabled={isFetching}
                    onClick={handleUpdateAuto}
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
                    disabled={isFetching}
                    onClick={() =>
                        selectedId != null && handleDelete(selectedId)
                    }
                >
                    選択を削除
                </button>
            </div>
        </>
    );
};
export default React.memo(DataEdit);
