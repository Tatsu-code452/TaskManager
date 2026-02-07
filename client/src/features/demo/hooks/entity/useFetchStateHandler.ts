import { error } from "../../../../utils/notify";
import { DataItem, Entity } from "../../const/const";
import { useEntityActions } from "./useEntityAction";

export const useFetchStateHandler = ({
    entity,
    isFetching,
    onChangeSelectedId,
    onChangeItems,
    onChangeIsFetching,
}: {
    entity: Entity;
    isFetching: boolean;
    onChangeItems: (items: DataItem[]) => void;
    onChangeSelectedId: (id: number | null) => void;
    onChangeIsFetching: (value: boolean) => void;
}) => {

    const { onFetch } = useEntityActions();

    const handleFetch = async () => {
        if (isFetching) return;

        onChangeIsFetching(true);

        try {
            const result = await onFetch(entity);

            if (result.ok === false) {
                error(result.error);
                return;
            }

            switch (result.kind) {
                case "data":
                    onChangeItems(result.data);
                    break;
                case "empty":
                    onChangeItems([]);
                    break;
            }

            onChangeSelectedId(null);
        } finally {
            onChangeIsFetching(false);
        }
    };

    return {
        handleFetch,
    };
};