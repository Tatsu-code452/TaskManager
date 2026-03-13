import { CallExpression, JsxAttribute, SyntaxKind } from "ts-morph";

export function extractJsxHandlers(attr: JsxAttribute): string[] {
    const init = attr.getInitializer();
    if (!init) return [];

    const calls = init.getDescendantsOfKind(SyntaxKind.CallExpression);

    return calls
        .map((call: CallExpression) => call.getExpression().getText())
        .filter((name) => /^[a-zA-Z0-9_]+$/.test(name));
}
