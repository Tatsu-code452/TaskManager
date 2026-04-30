import { SourceFile } from "ts-morph";
import { extractControllerUsage } from "../analyzer/component/extractControllerUsage";
import { extractJsxButtons } from "../analyzer/component/extractJsxButtons";
import { extractJsxInputs } from "../analyzer/component/extractJsxInputs";
import { extractTestMeta } from "../testHelper/extractTestMeta";
import { ParsedComponent } from "./types";

export function parseComponent(source: SourceFile): ParsedComponent {
    const { controllerName, controllerMethods } = extractControllerUsage(source);
    const { imports: testImports, vars: testVars, noProps } = extractTestMeta(source);

    const testVarNames = testVars
        .flatMap((block) =>
            block
                .split("\n")
                .map((l) => l.trim())
                .filter((l) => l.startsWith("const "))
        )
        .map((line) => {
            const match = line.match(/const\s+([a-zA-Z0-9_]+)/);
            return match ? match[1] : null;
        })
        .filter((x): x is string => x !== null);

    return {
        fileName: source.getBaseNameWithoutExtension(),
        controllerName,
        controllerMethods,
        noProps,
        testImports,
        testVars,
        testVarNames,
        buttons: extractJsxButtons(source),
        inputs: extractJsxInputs(source),
    };
}
