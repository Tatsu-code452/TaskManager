import { error as notifyError } from "../../../utils/notify";
import { parsePayload } from "../utils/demoUtils";
import { Entity } from "../const/demoConst";
import { useEntityApi } from "./useEntityApi";
import { useEntityEffects } from "./useEntityEffects";
import { useEntityPresets } from "./useEntityPresets";

export const useDataCreate = ({
    newId,
    newName,
    payloadJson,
    entity,
    effects,
}: {
    newId: string;
    newName: string;
    payloadJson: string;
    entity: Entity;
    effects: ReturnType<typeof useEntityEffects>;
}) => {
    const { createItem } = useEntityApi();
    const { handleSuccess } = effects;
    const { defaultPayloadFor, SAMPLE_PRESETS } = useEntityPresets();

    const create = async () => {
        try {
            const payload = parsePayload(newId, newName, payloadJson, entity);
            const res = await createItem(entity, payload);
            await handleSuccess(entity, res, "作成");
        } catch (err: any) {
            notifyError(err?.message || String(err));
        }
    };

    const createAuto = async () => {
        try {
            const payload = defaultPayloadFor(entity);
            const res = await createItem(entity, payload);
            await handleSuccess(entity, res, "作成");
        } catch (err: any) {
            notifyError(err?.message || String(err));
        }
    };

    return {
        create,
        createAuto,
        defaultPayloadFor,
        SAMPLE_PRESETS,
    };
};