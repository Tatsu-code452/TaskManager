import { useEntityEffects } from "./useEntityEffects";
import { Entity } from "../../const/const";

export const useDataFetch = ({
    entity,
    effects,
}: {
    entity: Entity,
    effects: ReturnType<typeof useEntityEffects>;
}) => {

    const { refreshList } = effects;

    const handleFetch = async () => {
        refreshList(entity);
    };
    return {
        handleFetch,
    };
};