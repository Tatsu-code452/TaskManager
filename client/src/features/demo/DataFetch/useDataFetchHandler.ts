import { useFetchHandler } from "../hooks/entity/useFetchHandler";
import { Entity, DataItem } from "../const/const";

export const useDataFetchHandler = ({
    entity,
    isFetching,
    setSelectedId,
    setItems,
    setIsFetching,
}: {
    entity: Entity;
    isFetching: boolean;
    setItems: (items: DataItem[]) => void;
    setSelectedId: (id: number | null) => void;
    setIsFetching: (value: boolean) => void;
}) => {
    const { handleFetch } = useFetchHandler({
        entity,
        isFetching,
        setSelectedId,
        setItems,
        setIsFetching,
    });

    return {
        handleFetch,
    };
};