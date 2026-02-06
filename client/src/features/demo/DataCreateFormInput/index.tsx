import React from "react";
import { DataCreateFormInputProps } from "./types";

// データ作成フォーム入力コンポーネント
const DataCreateFormInput = (props: DataCreateFormInputProps) => {
    const { newId, newName, setNewId, setNewName } = props;

    return (
        <>
            <input
                className="input"
                placeholder="新規ID (省略可)"
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
            />
            <input
                className="input"
                placeholder="名前 (省略可)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
        </>
    );
};

export default React.memo(DataCreateFormInput);
