export type ParsedComponent = {
    fileName: string;
    controllerName: string | null;
    controllerMethods: string[];

    inputs: {
        index: number;
        type: "input" | "select";
        handlers: string[];
        label: string | null;
        inputType: string;
        role: string | null;
    }[];

    buttons: {
        index: number;
        label: string | null;
        handlers: string[];
    }[];

    noProps: boolean;
    testImports: string[];
    testVars: string[];
    testVarNames: string[];
};
