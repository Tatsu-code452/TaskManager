// src/common/extractTestConfig.ts
import { SourceFile } from "ts-morph";
import { extractTestDataTag, loadTestData } from "../config/loadTestConfig";
import { extractTestMeta } from "./extractTestMeta";
import { extractTestProps } from "./extractTestProps";
import { extractTestReturns } from "./extractTestReturns";

export interface TestConfig {
    noProps: boolean;
    imports: string[];
    vars: string[];
    props: Record<string, unknown>;
    returns: Record<string, string>;
}

export function extractTestConfig(source: SourceFile): TestConfig {
    const meta = extractTestMeta(source);
    const props = extractTestProps(source);
    const returns = extractTestReturns(source);

    const tag = extractTestDataTag(source);
    const testData = tag ? loadTestData(tag) : null;

    return {
        noProps: meta.noProps,
        imports: meta.imports,
        vars: meta.vars,
        props: testData ?? props,
        returns
    };
}
