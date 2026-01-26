import { useEntityEffects } from "./useEntityEffects";
import { Entity } from "../../const/demoConst";

export const useTableMaintenance = ({
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