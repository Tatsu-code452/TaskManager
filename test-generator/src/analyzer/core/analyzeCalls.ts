import {
    ArrowFunction,
    CallExpression,
    FunctionExpression,
    SyntaxKind,
} from "ts-morph";
import { AnalyzedCall } from "./types";

export const analyzeCalls = (
    method: ArrowFunction | FunctionExpression
): AnalyzedCall[] => {
    const body = method.getBody();
    if (!body) return [];

    return body
        .getDescendantsOfKind(SyntaxKind.CallExpression)
        .map(call => (
            {
                callee: extractCallee(call),
                args: call.getArguments().map((a) => a.getText())
            }));
};

function extractCallee(call: CallExpression): string {
    const expr = call.getExpression();

    if (
        expr.getKind() === SyntaxKind.PropertyAccessExpression ||
        expr.getKind() === SyntaxKind.Identifier
    ) {
        return expr.getText();
    }

    return "unknown";
}
