import React from "react";
import { DataEditProps } from "./types";

// データ編集コンポーネント
const DataEdit = (props: DataEditProps) => {
    const { selectedId, loading, onDelete, onUpdate, onUpdateAuto } = props;

    return (
        <>
            <div className="form-row">
                <button
                    type="button"
                    className="button primary"
                    disabled={loading}
                    onClick={onUpdate}
                >
                    選択を更新
                </button>
                <button
                    type="button"
                    className="button secondary"
                    disabled={loading}
                    onClick={onUpdateAuto}
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
                    disabled={loading}
                    onClick={() => selectedId != null && onDelete(selectedId)}
                >
                    選択を削除
                </button>
            </div>
        </>
    );
};
export default React.memo(DataEdit);
