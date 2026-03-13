import { JsxAttribute, JsxElement, Node, SourceFile, SyntaxKind } from "ts-morph";

export type ExtractedButton = {
    index: number;
    label: string | null;
    handlers: string[];
};

function extractButtonHandler(attr: JsxAttribute): string[] {
    const init = attr.getInitializer();
    if (!init) return [];

    // onClick={...} の {...} は JsxExpression
    if (Node.isJsxExpression(init)) {
        const expr = init.getExpression();
        if (!expr) return [];

        // パターン1: onClick={onCancel}
        if (Node.isIdentifier(expr)) {
            return [expr.getText()];
        }

        // パターン2: onClick={() => onSubmit()}
        if (Node.isArrowFunction(expr)) {
            const body = expr.getBody();

            if (Node.isCallExpression(body)) {
                const callee = body.getExpression();
                if (Node.isIdentifier(callee)) {
                    return [callee.getText()];
                }
            }
        }
    }

    return [];
}


function extractButtonLabel(el: JsxElement): string | null {
    const textNode = el.getDescendantsOfKind(SyntaxKind.JsxText)[0];
    return textNode ? textNode.getText().trim() : null;
}

export function extractJsxButtons(source: SourceFile): ExtractedButton[] {
    const buttons: ExtractedButton[] = [];
    let index = 0;

    const jsxElements = source.getDescendantsOfKind(SyntaxKind.JsxElement);

    for (const el of jsxElements) {
        const opening = el.getOpeningElement();
        if (opening.getTagNameNode().getText() !== "button") continue;

        const attrs = opening.getAttributes().filter(a => Node.isJsxAttribute(a));
        const onClickAttr = attrs.find(a => a.getNameNode().getText() === "onClick");

        const handlers = onClickAttr ? extractButtonHandler(onClickAttr) : [];
        const label = extractButtonLabel(el) ?? `#${index}`;

        buttons.push({
            index: index++,
            label,
            handlers,
        });
    }

    return buttons;
}
