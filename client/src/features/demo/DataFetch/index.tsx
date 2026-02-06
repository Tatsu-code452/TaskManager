import React from "react";
import { useDataFetchHandler } from "./useDataFetchHandler";
import { ENTITIES, Entity } from "../const/const";
import { DataFetchProps } from "./types";

// テーブルメンテナンスコンポーネント
const DataFetch = (props: DataFetchProps) => {
    const {
        entity,
        setEntity,
        setItems,
        setSelectedId,
        setPayloadJson,
        isFetching,
        setIsFetching,
    } = props;

    const { handleFetch } = useDataFetchHandler({
        entity,
        isFetching,
        setSelectedId,
        setItems,
        setIsFetching,
    });

    return (
        <>
            <div className="form-row">
                <label className="small-note">対象テーブル: </label>
                <select
                    className="input"
                    value={entity}
                    onChange={(e) => {
                        setEntity(e.target.value as Entity);
                        setItems([]);
                        setSelectedId(null);
                        setPayloadJson("");
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
                    onClick={handleFetch}
                >
                    一覧取得
                </button>
            </div>
        </>
    );
};
export default React.memo(DataFetch);
