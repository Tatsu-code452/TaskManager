import React from "react";
import { DataCreateFormProps } from "./types";

// データ作成フォームコンポーネント
const DataCreateForm = (props: DataCreateFormProps) => {
    const { loading, onCreate, onCreateAuto } = props;

    return (
        <>
            <button
                className="button primary"
                disabled={loading}
                onClick={onCreate}
            >
                作成
            </button>
            <button
                className="button secondary"
                disabled={loading}
                onClick={onCreateAuto}
            >
                自動作成
            </button>
        </>
    );
};

export default React.memo(DataCreateForm);
