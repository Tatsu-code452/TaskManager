import {
    SourceFile,
    SyntaxKind
} from "ts-morph";
import { analyzeExportMethods } from "./analyzeMethods";
import { AnalyzedExport, ExportNode } from "./types";

export const analyzeExports = (source: SourceFile): AnalyzedExport[] => {
    const exports: AnalyzedExport[] = [
        ...extractExportConst(source),
        ...extractExportFunction(source),
        ...extractExportDefault(source)
    ];
    for (const exp of exports) {
        exp.methods = analyzeExportMethods(exp);
    }

    return exports;
};

function isExportNode(node: any): node is ExportNode {
    return [
        SyntaxKind.VariableDeclaration,
        SyntaxKind.FunctionDeclaration,
        SyntaxKind.ClassDeclaration,
        SyntaxKind.ObjectLiteralExpression,
        SyntaxKind.ArrowFunction,
        SyntaxKind.FunctionExpression
    ].includes(node.getKind());
}

function detectExportKind(name: string): AnalyzedExport["kind"] {
    if (name.startsWith("use") && name.endsWith("Controller")) return "controller";
    if (name.startsWith("use")) return "hook";
    if (name.endsWith("Api") || name.endsWith("API")) return "api";
    if (name === "default") return "component";
    return "unknown";
}

// -----------------------------------
// export const X = ...
// -----------------------------------
function extractExportConst(source: SourceFile): AnalyzedExport[] {
    return source
        .getVariableDeclarations()
        .filter((v) => v.isExported())
        .map(v => {
            return {
                name: v.getName(),
                kind: detectExportKind(v.getName()),
                node: v as ExportNode,
                methods: [],
            };
        });
}

// -----------------------------------
// export function X() { ... }
// -----------------------------------
function extractExportFunction(source: SourceFile): AnalyzedExport[] {
    return source
        .getFunctions()
        .filter((f) => f.isExported())
        .map(f => {
            return {
                name: f.getName() ?? "default",
                kind: detectExportKind(f.getName() ?? ""),
                node: f as ExportNode,
                methods: [],
            };
        })
}

// -----------------------------------
// export default ...
// -----------------------------------
function extractExportDefault(source: SourceFile): AnalyzedExport[] {
    const symbol = source.getDefaultExportSymbol();
    if (!symbol) return [];

    const decl = symbol.getDeclarations()[0];
    if (!decl || !isExportNode(decl)) return [];

    return [
        {
            name: "default",
            kind: detectExportKind("default"),
            node: decl,
            methods: []
        }
    ];
}