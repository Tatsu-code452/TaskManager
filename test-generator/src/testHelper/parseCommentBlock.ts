// src/common/parseCommentBlock.ts
export function stripCommentStars(lines: string[]): string[] {
    return lines.map(line =>
        line.replace(/^\s*\/?\**\s?/, "").trim()
    );
}

export function extractBlock(fullText: string, startTag: string, endTag: string): string[] {
    const start = fullText.indexOf(startTag);
    const end = fullText.indexOf(endTag);
    if (start === -1 || end === -1) return [];

    const block = fullText.substring(start + startTag.length, end);
    const lines = block.split("\n");
    return stripCommentStars(lines).filter(Boolean);
}
