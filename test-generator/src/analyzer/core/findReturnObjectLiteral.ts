import {
    Expression,
    ObjectLiteralExpression,
    ReturnStatement,
    SyntaxKind,
} from "ts-morph";
import { FunctionLikeNode } from "./types";

export function findReturnObjectLiteral(
    fn: FunctionLikeNode
): ObjectLiteralExpression | null {
    const body = fn.getBody();
    if (!body) return null;

    const objects = body
        .getDescendantsOfKind(SyntaxKind.ReturnStatement)
        .map(rs => {
            // return { ... }
            const exprObj = getObjectLiteralExpression(rs.getExpression());
            if (exprObj) return exprObj;

            // return something({ ... })
            return getObjectLiteralExpression(rs);
        })
        .filter((v): v is ObjectLiteralExpression => v !== null);
    return objects[0] ?? null;
}

function getObjectLiteralExpression(node: Expression | ReturnStatement | undefined): ObjectLiteralExpression | null {
    if (!node) return null;
    return node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression) ?? null;
}