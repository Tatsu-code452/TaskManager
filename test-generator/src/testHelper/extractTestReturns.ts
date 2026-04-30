import { SourceFile } from "ts-morph";
import { stripCommentStars } from "./parseCommentBlock";

export function extractTestReturns(source: SourceFile): Record<string, string> {
    const returns: Record<string, string> = {};
    const lines = stripCommentStars(source.getFullText().split("\n"));

    for (const line of lines) {
        const match = line.match(/@test-return\s+(\w+)\s+(.+)/);
        if (match) {
            const method = match[1];
            const value = match[2];
            returns[method] = value;
        }
    }

    return returns;
}
