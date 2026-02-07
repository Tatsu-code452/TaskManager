import React from "react";
import { toNumberId } from "../utils/id";
import DataRow from "./DataRow";
import HeaderRow from "./HeaderRow";
import { DataListProps } from "./types";

// データ表示コンポーネント
const DataList = (props: DataListProps) => {
    const { entity, items, selectedId, onSelectedId, onDelete } = props;

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
                                key={numberId}
                                item={item}
                                columns={columns}
                                selected={selectedId === numberId}
                                onSelect={() => onSelectedId(numberId)}
                                onDelete={() => onDelete(numberId)}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(DataList);
