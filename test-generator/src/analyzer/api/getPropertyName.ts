import { PropertyAssignment, ShorthandPropertyAssignment, SyntaxKind } from "ts-morph";

/**
 * プロパティ名を安全に取得
 */
export function getPropertyName(prop: any): string | null {
    switch (prop.getKind()) {
        case SyntaxKind.PropertyAssignment:
            return (prop as PropertyAssignment).getName();
        case SyntaxKind.ShorthandPropertyAssignment:
            return (prop as ShorthandPropertyAssignment).getName();
        default:
            return null;
    }
}
