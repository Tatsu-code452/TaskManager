import {
    ArrowFunction,
    FunctionDeclaration,
    FunctionExpression,
    ObjectLiteralExpression,
    SyntaxKind,
    VariableDeclaration,
} from "ts-morph";
import { extractMethodsFromObjectLiteral } from "./extractMethods";
import { findReturnObjectLiteral } from "./findReturnObjectLiteral";
import { AnalyzedExport, AnalyzedMethod, ExportNode } from "./types";

export function analyzeExportMethods(exp: AnalyzedExport): AnalyzedMethod[] {
    return [
        ...extractExportConstMethods(exp.node),
        ...extractExportFunctionMethods(exp.node)
    ];
}

function extractExportConstMethods(node: ExportNode): AnalyzedMethod[] {
    if (node.getKind() !== SyntaxKind.VariableDeclaration) return [];
    const init = (node as VariableDeclaration).getInitializer();
    if (!init) return [];

    switch (init.getKind()) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.FunctionExpression: {
            const obj = findReturnObjectLiteral(
                init as ArrowFunction | FunctionExpression);
            return obj ? extractMethodsFromObjectLiteral(obj) : [];
        }
        case SyntaxKind.ObjectLiteralExpression:
            return extractMethodsFromObjectLiteral(
                init as ObjectLiteralExpression
            );
    }

    return [];
}

function extractExportFunctionMethods(node: ExportNode): AnalyzedMethod[] {
    if (node.getKind() !== SyntaxKind.FunctionDeclaration) return [];
    const obj = findReturnObjectLiteral(node as FunctionDeclaration);
    return obj ? extractMethodsFromObjectLiteral(obj) : [];
}