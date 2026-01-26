import React from "react";
import HeaderRow from "./HeaderRow";
import DataRow from "./DataRow";
import { Entity } from "../../const/demoConst";
import { useDataList } from "../../hooks/crud/useDataList";
import { useEntityEffects } from "../../hooks/crud/useEntityEffects";
import { toNumberId } from "../../utils/utils";

export interface DataListProps {
    entity: Entity;
    items: Record<string, Entity>[];
    selectedId: number | null;
    setItems: React.Dispatch<React.SetStateAction<Entity[]>>;
    setSelectedId: (id: number) => void;
    setApiResult: React.Dispatch<React.SetStateAction<string | null>>;
    isFetching: React.RefObject<boolean>;
}

// データ表示コンポーネント
const DataList = (props: DataListProps) => {
    const {
        entity,
        items,
        selectedId,
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

    const { deleteId } = useDataList({
        entity,
        effects,
    });

    const columns = React.useMemo(() => {
        return Array.from(new Set(items.flatMap((it) => Object.keys(it))));
    }, [items]);

    if (items.length === 0) {
        return <div>{entity} がロードされていません</div>;
    }

    return (
        <div style={{ overflowX: "auto" }}>
            <table className="table">
                <thead>
                    <HeaderRow columns={columns} />
                </thead>
                <tbody>
                    {items.map((item) => {
                        const numberId = toNumberId(item.id);

                        return (
                            <DataRow
                                key={item.id}
                                item={item}
                                columns={columns}
                                selected={selectedId === numberId}
                                onSelect={() => setSelectedId(numberId)}
                                onDelete={() => deleteId(numberId)}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(DataList);
