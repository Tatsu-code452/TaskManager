import React from "react";
import { ENTITIES, Entity } from "../const/const";
import { DataFetchProps } from "./types";

// テーブルメンテナンスコンポーネント
const DataFetch = (props: DataFetchProps) => {
    const { entity, onChangeEntity, onReset, onFetch } = props;

    return (
        <>
            <div className="form-row">
                <label className="small-note">対象テーブル: </label>
                <select
                    className="input"
                    value={entity}
                    onChange={(e) => {
                        onChangeEntity(e.target.value as Entity);
                        onReset();
                    }}
                >
                    {ENTITIES.map((ent) => (
                        <option key={ent.key} value={ent.key}>
                            {ent.label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className="button secondary"
                    onClick={onFetch}
                >
                    一覧取得
                </button>
            </div>
        </>
    );
};
export default React.memo(DataFetch);
