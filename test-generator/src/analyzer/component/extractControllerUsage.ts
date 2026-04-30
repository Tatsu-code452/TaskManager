import {
    ObjectBindingPattern,
    SourceFile,
    SyntaxKind
} from "ts-morph";
import { ExtractedControllerUsage } from "../core/types";

export function extractControllerUsage(
    source: SourceFile
): ExtractedControllerUsage {
    const callExprs = source.getDescendantsOfKind(SyntaxKind.CallExpression);

    for (const call of callExprs) {
        const expr = call.getExpression();

        // useXxxController の呼び出しか？
        const calleeName = expr.getText();
        if (!/^use[A-Z].+Controller$/.test(calleeName)) continue;

        const parent = call.getParent();
        if (!parent) {
            return { controllerName: calleeName, controllerMethods: [] };
        }

        // const { loadProjects, searchProjects } = useProjectListController();
        if (parent.getKind() === SyntaxKind.VariableDeclaration) {
            const decl = parent.asKindOrThrow(SyntaxKind.VariableDeclaration);

            const destruct = decl.getFirstChildByKind(
                SyntaxKind.ObjectBindingPattern
            ) as ObjectBindingPattern | undefined;

            if (!destruct) {
                return { controllerName: calleeName, controllerMethods: [] };
            }

            const methods = destruct
                .getElements()
                .map((e) => e.getName())
                .filter((name) => /^[a-zA-Z0-9_]+$/.test(name));

            return {
                controllerName: calleeName,
                controllerMethods: methods,
            };
        }
    }

    return {
        controllerName: null,
        controllerMethods: [],
    };
}
