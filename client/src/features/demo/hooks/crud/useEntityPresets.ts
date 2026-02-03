import { defaultPayloadFor } from "../../utils/payload/default";
import { SAMPLE_PRESETS } from "../../utils/payload/preset";

export const useEntityPresets = () => {
    return {
        defaultPayloadFor,
        SAMPLE_PRESETS,
    };
};