import React from "react";
import { useDataList } from "../hooks/useDataList";
import { useEntityEffects } from "../hooks/useEntityEffects";
import { Entity } from "../const/demoConst";

interface DataListProps {
    entity: Entity;
    items: Record<string, any>[];
    selectedId: number | null;
    setItems: React.Dispatch<React.SetStateAction<any[]>>;
    setSelectedId: (id: number) => void;
    setApiResult: React.Dispatch<React.SetStateAction<string | null>>;
    isFetching: React.RefObject<boolean>;
}

const DataList: React.FC<DataListProps> = (props) => {
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
        selectedId,
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
                    {items.map((item) => (
                        <DataRow
                            key={item.id}
                            item={item}
                            columns={columns}
                            selected={selectedId === item.id}
                            onSelect={() => setSelectedId(item.id)}
                            onDelete={() => deleteId()}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(DataList);

// ----------------------------
// 小コンポーネント
// ----------------------------

const HeaderRow: React.FC<{ columns: string[] }> = ({ columns }) => (
    <tr>
        <th>操作</th>
        {columns.map((k) => (
            <th key={k}>{k}</th>
        ))}
    </tr>
);

interface DataRowProps {
    item: Record<string, any>;
    columns: string[];
    selected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}

const DataRow: React.FC<DataRowProps> = ({
    item,
    columns,
    selected,
    onSelect,
    onDelete,
}) => (
    <tr
        className={selected ? "selected" : ""}
        onClick={onSelect}
        onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect();
            }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
    >
        <td className="cell">
            <button
                type="button"
                className="button warn"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
                style={{ marginLeft: 6 }}
            >
                削除
            </button>
        </td>

        {columns.map((k) => (
            <td key={k} className="cell">
                {typeof item[k] === "object"
                    ? JSON.stringify(item[k])
                    : String(item[k] ?? "")}
            </td>
        ))}
    </tr>
);
