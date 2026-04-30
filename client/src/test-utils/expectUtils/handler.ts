import { calledTimes } from "./calledTimes";
import { calledWith } from "./calledWith";
import { disabled } from "./disabled";
import { equalOptions } from "./equalOptions";
import { haveText } from "./haveText";
import { haveValue } from "./haveValue";
import { inDocument } from "./inDocument";
import { inDocumentRow } from "./inDocumentRow";
import { notInDocument } from "./notInDocument";

export const handlers = {
    inDocument,
    inDocumentRow,
    haveValue,
    haveText,
    equalOptions,
    notInDocument,
    calledTimes,
    calledWith,
    disabled,
} as const;
