// parseHook.ts
import { SourceFile } from "ts-morph";
import { analyzeSource } from "../analyzer/core/analyzeSource";
import { extractTestMeta } from "../testHelper/extractTestMeta";

export function parseHook(source: SourceFile) {
    const analyzed = analyzeSource(source);

    const exports = analyzed.exports.find((e) => e.kind === "hook");
    if (!exports) {
        return {
            hookName: "",
            methods: [],
            testImports: [],
            testVars: [],
        };
    }

    const { imports: testImports, vars: testVars } = extractTestMeta(source);

    return {
        hookName: exports.name,
        methods: exports.methods.map((m) => ({
            name: m.name,
            params: m.params,
        })),
        testImports,
        testVars,
    };
}
