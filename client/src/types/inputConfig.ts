type InputBase<K extends string> = {
    key: K;
    label: string;
    value: string;
};

type TextInput<K extends string> = InputBase<K> & {
    type: "text" | "date" | "textarea" | "number";
};

type SelectInput<K extends string> = InputBase<K> & {
    type: "select";
    options: string[];
    labelMap: Record<string, string>;
};

export type InputConfig<K extends string> =
    | TextInput<K>
    | SelectInput<K>;