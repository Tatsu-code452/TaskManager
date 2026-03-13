import { CallExpression, ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { extractObjectLiteral } from "./extractObjectLiteral";

/**
 * invoke("xxx", { ... }) の情報を抽出
 */
export function extractInvoke(call: CallExpression) {
    const typeArgs = call.getTypeArguments();
    const typeParam = typeArgs.length > 0 ? typeArgs[0].getText() : null;

    const args = call.getArguments();

    // invoke("search_projects", ...) の第1引数
    let invokeNameRaw = args[0]?.getText() ?? null;

    // ★ クォートを除去する
    let invokeName = invokeNameRaw?.replace(/^["'`](.*)["'`]$/, "$1") ?? null;

    // payload を抽出
    let payload: any = {};
    if (args[1] && args[1].getKind() === SyntaxKind.ObjectLiteralExpression) {
        payload = extractObjectLiteral(args[1] as ObjectLiteralExpression);
    }

    return {
        invokeSignature: call.getText(), // テスト表示用
        invokeName,                      // ★ "search_projects" → search_projects
        typeParam,
        payload,
    };
}
