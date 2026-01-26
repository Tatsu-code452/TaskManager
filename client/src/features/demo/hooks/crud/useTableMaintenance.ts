import { Dispatch, SetStateAction, useState, MouseEventHandler } from "react";
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

    const mouseHandleFetch: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        refreshList(entity);
    };
    return {
        mouseHandleFetch,
    };
};