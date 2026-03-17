import fs from "fs";
import path from "path";
import { SourceFile } from "ts-morph";
import { ExtractedTestProps } from "../testHelper/extractTestProps";


export function extractTestDataTag(source: SourceFile): string | null {
    const comments = source.getLeadingCommentRanges();

    for (const c of comments) {
        const text = c.getText();
        if (text.includes("@test-data")) {
            const [, file] = text.split(":");
            return file?.trim() ?? null;
        }
    }

    return null;
}

export function loadTestData(file: string): ExtractedTestProps {
    const fullPath = path.join(process.cwd(), "tests/data", file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(raw) as ExtractedTestProps;
}
