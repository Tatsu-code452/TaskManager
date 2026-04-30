import { ObjectLiteralExpression } from "ts-morph";
import { getPropertyName } from "./getPropertyName";

/**
 * ObjectLiteral の中身を { key: valueText } 形式で抽出
 */
export function extractObjectLiteral(obj: ObjectLiteralExpression) {
    const result: Record<string, string> = {};

    for (const prop of obj.getProperties()) {
        const name = getPropertyName(prop);
        if (!name) continue;

        const initializer = (prop as any).getInitializer();
        if (!initializer) continue;

        let text = initializer.getText();

        // ★ クォートを除去する
        if (/^["'`].*["'`]$/.test(text)) {
            text = text.slice(1, -1);
        }

        result[name] = text;
    }

    return result;
}