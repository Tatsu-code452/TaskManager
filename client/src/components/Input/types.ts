export type BaseProps = {
    label?: string;
    className?: string;
    rowClassName?: string;
};

export type SelectProps<T extends string> = BaseProps & {
    type: "select";
    value: T;
    options: readonly T[];
    labelMap: Record<T, string>;
    onChange: (value: T) => void;
};

export type TextareaProps<T extends string | string[]> = BaseProps & {
    type: "textarea";
    value: T;
    onChange: (value: T) => void;
};

export type TextInputProps = BaseProps & {
    type: "text";
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
};

export type OtherInputProps = BaseProps & {
    type: "date" | "number";
    value: string;
    onChange: (value: string) => void;
};

export type InputTyeps = "text" | "textarea" | "select" | "date" | "number";

export type InputProps<T extends string = string> =
    | SelectProps<T>
    | TextareaProps<string>
    | TextareaProps<string[]>
    | TextInputProps
    | OtherInputProps;
