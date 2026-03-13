import {
    ArrowFunction,
    ClassDeclaration,
    FunctionDeclaration,
    FunctionExpression,
    MethodDeclaration,
    ObjectLiteralExpression,
    VariableDeclaration
} from "ts-morph";

export type AnalyzedCall = {
    callee: string;
    args: string[];
};

export type AnalyzedMethod = {
    name: string;
    async: boolean;
    params: string[];
    node: MethodNode;
    calls: AnalyzedCall[];
};

export type AnalyzedExport = {
    name: string;
    kind: "api" | "controller" | "hook" | "component" | "unknown";
    node: ExportNode;
    methods: AnalyzedMethod[];
};

export type AnalyzedSource = {
    filePath: string;
    exports: AnalyzedExport[];
};

export type FunctionLikeNode =
    | ArrowFunction
    | FunctionExpression
    | MethodDeclaration
    | FunctionDeclaration;

export type MethodNode = ArrowFunction | FunctionExpression | MethodDeclaration;

export type ExportNode =
    | VariableDeclaration
    | FunctionDeclaration
    | ClassDeclaration
    | ArrowFunction
    | FunctionExpression
    | ObjectLiteralExpression;

export type ControllerView = {
    name: string;
    methods: {
        name: string;
        params: string[];
        calls: AnalyzedCall[];
    }[];
};

export type ApiView = {
    name: string;
    endpoints: {
        name: string;
        params: string[];
        calls: AnalyzedCall[];
    }[];
};

export type ExtractedControllerUsage = {
    controllerName: string | null;
    controllerMethods: string[];
};

export type ExtractedInput = {
    type: "input" | "select";
    handlers: string[];
    index: number;
    label: string | null;
    inputType: string;
    role: string | null;
};
