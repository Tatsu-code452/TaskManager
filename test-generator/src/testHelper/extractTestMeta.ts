import { SourceFile } from "ts-morph";
import { stripCommentStars } from "./parseCommentBlock";

export interface ExtractedTestMeta {
    noProps: boolean;
    imports: string[];
    vars: string[];
}

export function extractTestMeta(source: SourceFile): ExtractedTestMeta {
    const imports: string[] = [];
    const vars: string[] = [];
    let noProps = false;

    const lines = stripCommentStars(source.getFullText().split("\n"));

    let inBlock = false;
    let blockBuffer: string[] = [];

    for (const line of lines) {

        // ----------------------------------------
        // @test-no-props
        // ----------------------------------------
        if (line.includes("@test-no-props")) {
            noProps = true;
            continue;
        }

        // ----------------------------------------
        // @test-import
        // ----------------------------------------
        const imp = line.match(/@test-import\s+(.+)/);
        if (imp) {
            imports.push(imp[1].trim());
            continue;
        }

        // ----------------------------------------
        // @test-var-block 開始
        // ----------------------------------------
        if (line.includes("@test-var-block")) {
            inBlock = true;
            blockBuffer = [];
            continue;
        }

        // ----------------------------------------
        // @end-test-var-block 終了
        // ----------------------------------------
        if (line.includes("@end-test-var-block")) {
            inBlock = false;
            vars.push(blockBuffer.join("\n"));
            continue;
        }

        // ----------------------------------------
        // ブロック中の行
        // ----------------------------------------
        if (inBlock) {
            blockBuffer.push(line);
            continue;
        }

        // ----------------------------------------
        // 単一行の @test-var
        // ----------------------------------------
        const single = line.match(/@test-var\s+(.+)/);
        if (single) {
            vars.push(single[1].trim());
        }
    }

    return { imports, vars, noProps };
}
