import React from "react";
import { useDataFetch } from "../../hooks/crud/useDataFetch";
import { useEntityEffects } from "../../hooks/crud/useEntityEffects";
import { ENTITIES, Entity, DataItem } from "../../const/const";

export interface DataFetchProps {
    entity: Entity;
    setEntity: React.Dispatch<React.SetStateAction<Entity>>;
    setItems: React.Dispatch<React.SetStateAction<DataItem[]>>;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setPayloadJson: React.Dispatch<React.SetStateAction<string>>;
    setApiResult: React.Dispatch<React.SetStateAction<string | null>>;
    isFetching: React.RefObject<boolean>;
}

// テーブルメンテナンスコンポーネント
const DataFetch = (props: DataFetchProps) => {
    const {
        entity,
        setEntity,
        setItems,
        setSelectedId,
        setPayloadJson,
        setApiResult,
        isFetching,
    } = props;

    const effects = useEntityEffects({
        onItemsUpdated: setItems,
        onResult: setApiResult,
        onClearSelection: () => setSelectedId(null),
        isFetching,
    });

    const { handleFetch } = useDataFetch({
        entity,
        effects,
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
