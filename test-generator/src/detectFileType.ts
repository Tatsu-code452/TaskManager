import { ArrowFunction, SourceFile, SyntaxKind } from "ts-morph";

export type FileType = "component" | "controller" | "hook" | "api" | "unknown";

export function detectFileType(source: SourceFile): FileType {
    if (isComponent(source)) return "component";
    if (isController(source)) return "controller";
    if (isHook(source)) return "hook";
    if (isApi(source)) return "api";
    return "unknown";
}

function isComponent(source: SourceFile): boolean {
    return (
        source.getDescendantsOfKind(SyntaxKind.JsxElement).length > 0 ||
        source.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement).length > 0
    );
}

function isController(source: SourceFile): boolean {
    const exportedVars = source.getVariableDeclarations().filter(v => v.isExported());

    return exportedVars.some(v => {
        const name = v.getName();
        if (!/^use.*Controller$/.test(name)) return false;

        const init = v.getInitializer();
        if (!init || init.getKind() !== SyntaxKind.ArrowFunction) return false;

        const arrow = init as ArrowFunction;
        const body = arrow.getBody();
        if (!body || body.getKind() !== SyntaxKind.Block) return false;

        // Block の中の SyntaxList を取得
        const syntaxList = body.getFirstChildByKind(SyntaxKind.SyntaxList);
        if (!syntaxList) return false;

        // SyntaxList の直下の ReturnStatement を探す
        const returnStmt = syntaxList.getChildren().find(
            c => c.getKind() === SyntaxKind.ReturnStatement
        );
        if (!returnStmt) return false;

        // return { ... } の ObjectLiteral を取得
        const obj = returnStmt.getFirstDescendantByKind(
            SyntaxKind.ObjectLiteralExpression
        );
        if (!obj) return false;

        if (obj.getProperties().length > 0) {
            return true;
        }
    });
}

function isHook(source: SourceFile): boolean {
    const exportedVars = source.getVariableDeclarations().filter(v => v.isExported());
    const exportedFunctions = source.getFunctions().filter(fn => fn.isExported());

    // useXxxController は Controller に分類されるので除外
    const isHookVar = exportedVars.some(v => {
        const name = v.getName();
        if (!name) return false;
        if (!/^use[A-Z]/.test(name)) return false;
        if (/Controller$/.test(name)) return false;

        return v.getInitializer()?.getKind() === SyntaxKind.ArrowFunction;
    });

    const isHookFn = exportedFunctions.some(fn => {
        const name = fn.getName();
        if (!name) return false;
        if (!/^use[A-Z]/.test(name)) return false;
        if (/Controller$/.test(name)) return false;
        return true;
    });

    return isHookVar || isHookFn;
}

function isApi(source: SourceFile): boolean {
    const exportedVars = source.getVariableDeclarations().filter(v => v.isExported());

    return exportedVars.some(v => {
        const init = v.getInitializer();
        return init?.getKind() === SyntaxKind.ObjectLiteralExpression;
    });
}