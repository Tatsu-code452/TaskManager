import { useDragRenderer } from "./renderer/createDragRenderer";
import { useEditorRenderer } from "./renderer/createEditorRenderer";
import { useInteractionRenerer } from "./renderer/createInteractionRenderer";
import { useVisualRenderer } from "./renderer/createVisualRenderer";

export const useCellUIFactories = () => {
    return {
        visual: useVisualRenderer(),
        drag: useDragRenderer(),
        editor: useEditorRenderer(),
        interaction: useInteractionRenerer(),
    };
};
