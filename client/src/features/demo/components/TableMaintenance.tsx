import React from "react";
import { useTableMaintenance } from "../hooks/useTableMaintenance";
import { useEntityEffects } from "../hooks/useEntityEffects";
import { ENTITIES, Entity } from "../const/demoConst";

interface TableMaintenanceProps {
    entity: Entity;
    setEntity: (value: Entity) => void;
    setItems: (items: any[]) => void;
    setSelectedId: (id: number | null) => void;
    setPayloadJson: (json: string) => void;
    setApiResult: (json: string) => void;
    isFetching: React.RefObject<boolean>;
}

const TableMaintenance: React.FC<TableMaintenanceProps> = ({
    entity,
    setEntity,
    setItems,
    setSelectedId,
    setPayloadJson,
    setApiResult,
    isFetching,
}) => {
    const effects = useEntityEffects({
        onItemsUpdated: setItems,
        onResult: setApiResult,
        onClearSelection: () => setSelectedId(null),
        isFetching,
    });

    const { mouseHandleFetch } = useTableMaintenance({
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
                    onClick={mouseHandleFetch}
                >
                    一覧取得
                </button>
            </div>
        </>
    );
};
export default React.memo(TableMaintenance);
