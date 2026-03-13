import {
    ArrowFunction,
    CallExpression,
    Expression,
    FunctionExpression,
    MethodDeclaration,
    ObjectLiteralElementLike,
    PropertyAssignment,
    ShorthandPropertyAssignment,
    SyntaxKind,
    VariableDeclaration,
} from "ts-morph";
import { MethodNode } from "./types";

export function resolveInitializer(
    prop: ObjectLiteralElementLike
): MethodNode | null {
    return (
        extractMethodDeclaration(prop) ??
        extractPropertyAssignment(prop) ??
        extractShorthandMethodNode(prop) ??
        null
    );
}

function unwrapInitializer(expr: Expression): MethodNode | null {
    switch (expr.getKind()) {
        case SyntaxKind.CallExpression: {
            const call = expr as CallExpression;
            const callee = call.getExpression().getText();
            if (callee === "useCallback") {
                const arg = call.getArguments()[0];
                return arg.asKindOrThrow(SyntaxKind.ArrowFunction);
            }
            return null;
        }
        case SyntaxKind.ArrowFunction:
            return expr as ArrowFunction;
        case SyntaxKind.FunctionExpression:
            return expr as FunctionExpression;
        default:
            return null;
    }
}

// { foo() {} }
function extractMethodDeclaration(prop: ObjectLiteralElementLike): MethodNode | null {
    if (prop.getKind() !== SyntaxKind.MethodDeclaration) return null;

    return prop as MethodDeclaration;
}

// { foo: () => {} } / { foo: function () {} }
function extractPropertyAssignment(prop: ObjectLiteralElementLike): MethodNode | null {
    if (prop.getKind() !== SyntaxKind.PropertyAssignment) return null;

    const init = (prop as PropertyAssignment).getInitializer();
    return init ? unwrapInitializer(init) : null;

}

// { foo } → ShorthandPropertyAssignment
function extractShorthandMethodNode(prop: ObjectLiteralElementLike): MethodNode | null {
    if (prop.getKind() !== SyntaxKind.ShorthandPropertyAssignment) return null;

    const id = (prop as ShorthandPropertyAssignment).getNameNode();
    const decl = id.getDefinitionNodes()[0];

    if (decl?.getKind() === SyntaxKind.VariableDeclaration) {
        const init = (decl as VariableDeclaration).getInitializer();
        return init ? unwrapInitializer(init) : null;
    }

    return null;
}
