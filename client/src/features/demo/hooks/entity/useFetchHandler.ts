import { error } from "../../../../utils/notify";
import { DataItem, Entity } from "../../const/const";
import { useEntityActions } from "./useEntityAction";

export const useFetchHandler = ({
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

    const { onFetch } = useEntityActions();

    const handleFetch = async () => {
        if (isFetching) return;

        setIsFetching(true);

        try {
            const result = await onFetch(entity);

            if (result.ok === false) {
                error(result.error);
                return;
            }

            switch (result.kind) {
                case "data":
                    setItems(result.data);
                    break;
                case "empty":
                    setItems([]);
                    break;
            }

            setSelectedId(null);
        } finally {
            setIsFetching(false);
        }
    };

    return {
        handleFetch,
    };
};