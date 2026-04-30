// parseController.ts
import { SourceFile } from "ts-morph";
import { analyzeSource } from "../analyzer/core/analyzeSource";
import { extractTestMeta } from "../testHelper/extractTestMeta";

export function parseController(source: SourceFile) {
    const analyzed = analyzeSource(source);

    const exports = analyzed.exports.find((e) => e.kind === "controller");
    if (!exports) {
        return {
            controllerName: "",
            methods: [],
            testImports: [],
            testVars: [],
        };
    }

    const { imports: testImports, vars: testVars } = extractTestMeta(source);

    return {
        controllerName: exports.name,
        methods: exports.methods.map((m) => ({
            name: m.name,
            async: m.async,
            params: m.params,
        })),
        testImports,
        testVars,
    };
}
