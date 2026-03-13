// parseAPI.ts
import { CallExpression, SourceFile, SyntaxKind } from "ts-morph";
import { extractInvoke } from "../analyzer/api/extractInvoke";
import { analyzeSource } from "../analyzer/core/analyzeSource";
import { AnalyzedMethod, MethodNode } from "../analyzer/core/types";
import { extractTestMeta } from "../testHelper/extractTestMeta";
import { extractTestReturns } from "../testHelper/extractTestReturns";

export function parseAPI(source: SourceFile) {
    const analyzed = analyzeSource(source);

    const exports = analyzed.exports.find((e) => e.kind === "api");
    if (!exports) {
        return {
            exportName: null,
            functions: [],
            invokes: [],
            testVars: [],
            testImports: [],
            testReturns: {},
        };
    }

    const methods = exports.methods;

    const { imports: testImports, vars: testVars } = extractTestMeta(source);

    return {
        exportName: exports.name,
        functions: methods.map((m) => ({
            name: m.name,
            params: m.params,
        })),
        invokes: extractApiInvokes(methods),
        testVars,
        testImports,
        testReturns: extractTestReturns(source),
    };
}

function extractApiInvokes(methods: AnalyzedMethod[]) {
    const invokes: any[] = [];

    for (const m of methods) {
        const fn = m.node as MethodNode;
        const callExprs = fn.getDescendantsOfKind(SyntaxKind.CallExpression);

        for (const call of callExprs) {
            if (!isInvokeCall(call)) continue;

            invokes.push({
                method: m.name,
                ...extractInvoke(call),
            });
        }
    }

    return invokes;
}

function isInvokeCall(call: CallExpression): boolean {
    const expr = call.getExpression();
    return expr.getText().includes("invoke");
}

