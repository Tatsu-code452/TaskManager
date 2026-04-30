import {
    MethodDeclaration,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    PropertyAssignment,
    ShorthandPropertyAssignment,
    SyntaxKind
} from "ts-morph";
import { resolveInitializer } from "./resolveInitializer";
import { AnalyzedMethod } from "./types";

export function extractMethodsFromObjectLiteral(
    obj: ObjectLiteralExpression
): AnalyzedMethod[] {

    return obj.getProperties()
        .filter(isNamedProperty)
        .map(prop => {
            const init = resolveInitializer(prop);
            if (!init) return null;
            return {
                name: prop.getName() ?? "unknown",
                async: init.isAsync(),
                params: init.getParameters().map((p) => p.getName()),
                calls: [],
                node: init,
            } as AnalyzedMethod;
        })
        .filter((v): v is AnalyzedMethod => v !== null);
}

function isNamedProperty(
    prop: ObjectLiteralElementLike
): prop is
    PropertyAssignment
    | ShorthandPropertyAssignment
    | MethodDeclaration {
    const targetNamedKinds = new Set([
        SyntaxKind.PropertyAssignment,
        SyntaxKind.ShorthandPropertyAssignment,
        SyntaxKind.MethodDeclaration
    ]);

    return targetNamedKinds.has(prop.getKind());
}