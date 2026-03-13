// extractTestProps.ts
import { SourceFile } from "ts-morph";
import { extractBlock } from "./parseCommentBlock";

export type TestPropValue =
    | "fn"
    | string
    | number
    | boolean
    | Record<string, unknown>
    | unknown[];

export type ExtractedTestProps = Record<string, TestPropValue>;

export function extractTestProps(source: SourceFile): ExtractedTestProps {
    const lines = extractBlock(
        source.getFullText(),
        "@test-props",
        "@end-test-props");

    const props: ExtractedTestProps = {};

    for (const line of lines) {
        const [rawKey, rawValue] = line.split(":").map((s) => s.trim());
        if (!rawKey || !rawValue) continue;

        const key = rawKey.replace(/:$/, "");

        if (rawValue === "fn") {
            props[key] = "fn";
            continue;
        }

        if (rawValue.startsWith("{") || rawValue.startsWith("[")) {
            const parsed = safeJsonParse(rawValue);
            if (parsed !== undefined) {
                props[key] = parsed as TestPropValue;
                continue;
            }
        }

        if (/^\d+$/.test(rawValue)) {
            props[key] = Number(rawValue);
            continue;
        }

        props[key] = rawValue.replace(/,$/, "");
    }

    return props;
}

function safeJsonParse(text: string): unknown | undefined {
    try {
        return Function(`"use strict"; return (${text});`)();
    } catch {
        return undefined;
    }
}
