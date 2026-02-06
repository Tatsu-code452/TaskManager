import React from "react";
import HeaderRow from "./HeaderRow";
import DataRow from "./DataRow";
import { DataListProps } from "./types";
import { useDataListHandler } from "./useDataListHandler";
import { toNumberId } from "../utils/id";

// データ表示コンポーネント
const DataList = (props: DataListProps) => {
    const {
        entity,
        items,
        selectedId,
        setItems,
        setSelectedId,
        isFetching,
        setIsFetching,
    } = props;

    const { handleDelete } = useDataListHandler({
        entity,
        isFetching,
        setItems,
        setSelectedId,
        setIsFetching,
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
                                key={numberId}
                                item={item}
                                columns={columns}
                                selected={selectedId === numberId}
                                onSelect={() => setSelectedId(numberId)}
                                onDelete={() => handleDelete(numberId)}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(DataList);
