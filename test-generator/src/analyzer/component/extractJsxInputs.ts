import {
    JsxAttribute,
    JsxOpeningElement,
    JsxSelfClosingElement,
    Node,
    SourceFile,
    SyntaxKind
} from "ts-morph";
import { ExtractedInput } from "../core/types";

function extractHandlerName(attr: JsxAttribute): string[] {
    const init = attr.getInitializer();
    if (!init || !Node.isJsxExpression(init)) return [];

    const expr = init.getExpression();
    if (!expr || !Node.isArrowFunction(expr)) return [];

    const body = expr.getBody();
    if (!Node.isCallExpression(body)) return [];

    const callee = body.getExpression();
    if (!Node.isIdentifier(callee)) return [];

    return [callee.getText()];
}

function extractLabelForInput(el: JsxOpeningElement | JsxSelfClosingElement): string | null {
    // 祖先ノードの中から JsxElement を全部取得
    const parentJsx = el.getAncestors()
        .filter(a => Node.isJsxElement(a))
        .find(a => {
            return a.getStart() < el.getStart()
                && a.getEnd() > el.getEnd();
        });
    if (!parentJsx) return null;

    const labelEl = parentJsx
        .getChildrenOfKind(SyntaxKind.JsxElement)
        .find(e => e.getOpeningElement().getTagNameNode().getText() === "label");
    if (!labelEl) return null;

    const textNode = labelEl.getDescendantsOfKind(SyntaxKind.JsxText)[0];
    return textNode ? textNode.getText().trim() : null;
}

export function extractJsxInputs(source: SourceFile): ExtractedInput[] {
    const inputs: ExtractedInput[] = [];

    let inputIndex = 0;
    let selectIndex = 0;

    const jsxElements = [
        ...source.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
        ...source.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ];

    for (const el of jsxElements) {
        if (!isJsxInput(el)) continue;

        const onChangeAttr = hasOnChangeAttr(el);
        if (!onChangeAttr) continue;

        const tag = el.getTagNameNode().getText();
        const inputType = getInputType(el);

        inputs.push({
            type: tag as "input" | "select",
            handlers: extractHandlerName(onChangeAttr),
            index: tag === "input" ? inputIndex++ : selectIndex++,
            label: extractLabelForInput(el),
            inputType,
            role: getRole(tag, inputType),
        });
    }
    return inputs;
}

function getAttributeValue(
    el: JsxOpeningElement | JsxSelfClosingElement,
    name: string
): string | null {
    const attr = el.getAttribute(name);
    if (!attr) return null;

    const init = attr.getFirstDescendantByKind(SyntaxKind.StringLiteral);
    return init ? init.getLiteralValue() : null;
}

function getRole(tag: string, inputType: string) {
    let role = null;
    if (tag === "select") {
        role = "combobox";
    } else if (tag === "input") {
        switch (inputType) {
            case "text":
            case "email":
            case "password":
            case "search":
            case "url":
                role = "textbox";
                break;

            case "number":
                role = "spinbutton";
                break;

            case "date":
            case "datetime-local":
            case "month":
            case "week":
            case "time":
                role = null; // ← Testing Library では role が付かない
                break;

            default:
                role = null;
        }
    }
    return role;
}

function isJsxInput(el: JsxOpeningElement | JsxSelfClosingElement) {
    const tag = el.getTagNameNode().getText();
    return tag === "input" || tag === "select";
}

function hasOnChangeAttr(el: JsxOpeningElement | JsxSelfClosingElement): JsxAttribute | null {
    const attrs = el.getAttributes().filter(a => Node.isJsxAttribute(a));
    const onChangeAttr = attrs.find(a => a.getNameNode().getText() === "onChange");

    if (!onChangeAttr) return null;
    return onChangeAttr;
}

function getInputType(el: JsxOpeningElement | JsxSelfClosingElement) {
    return (el.getTagNameNode().getText() === "input") ?
        getAttributeValue(el, "type") || "text"
        : "";

}