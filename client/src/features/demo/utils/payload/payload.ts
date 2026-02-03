import { Entity, PayloadOf } from "../../const/const";
import { toNumberId } from "../id";
import { parseJsonSafe } from "../json";
import { defaultPayloadFor } from "./default";

/**
 * JSON またはデフォルトから base payload を生成
 */
const parseBasePayload = <E extends Entity>(
    json: string,
    entity: E
): PayloadOf<E> => {
    if (!json.trim()) return defaultPayloadFor(entity);

    const parsed = parseJsonSafe<PayloadOf<E>>(json);
    if (!parsed) throw new Error("Invalid JSON payload");

    return parsed;
};

/**
 * UI 入力 + JSON + default を統合した Payload を生成
 */
export const parsePayload = <E extends Entity>(
    idStr: string,
    nameStr: string,
    payloadJson: string,
    entity: E
): PayloadOf<E> => {
    const base = parseBasePayload(payloadJson, entity);
    const idNum = toNumberId(idStr);

    return {
        ...base,
        id: idNum ?? base.id,
        name: nameStr || base.name,
    };
};