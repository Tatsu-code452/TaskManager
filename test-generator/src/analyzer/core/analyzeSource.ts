// analyzeSource.ts
import { SourceFile } from "ts-morph";
import { analyzeExports } from "./analyzeExports";
import { AnalyzedSource } from "./types";

export const analyzeSource = (source: SourceFile): AnalyzedSource => {
    return {
        filePath: source.getFilePath(),
        exports: analyzeExports(source),
    };
};
