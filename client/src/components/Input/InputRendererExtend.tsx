import styles from "./Input.module.css";

export type InputTyeps = "text" | "textarea" | "select" | "date" | "number";

export type InputProps = TextProps | TextAreaProps | SelectProps | OtherProps;

export type BaseProps = {
    type: InputTyeps;
    className?: string;
    label?: string;
};

export type TextProps = BaseProps & {
    type: "text";
} & React.InputHTMLAttributes<HTMLInputElement>;

export type TextAreaProps = BaseProps & {
    type: "textarea";
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type SelectProps<T extends string = string> = BaseProps & {
    type: "select";
    options: readonly T[];
    labelMap: Record<T, string>;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export type OtherProps =
    | (BaseProps & {
          type: "date";
      } & React.InputHTMLAttributes<HTMLInputElement>)
    | (BaseProps & {
          type: "number";
      } & React.InputHTMLAttributes<HTMLInputElement>);

export const renderText = ({ id, className, ...rest }: TextProps) => (
    <input
        id={id}
        type="text"
        className={`${styles.detail_input} ${className ?? ""}`}
        {...rest}
    />
);

export const renderTextarea = ({
    id,
    className,
    rows,
    value,
    ...rest
}: TextAreaProps) => (
    <textarea
        id={id}
        className={`${styles.detail_input} ${className ?? ""}`}
        rows={rows ?? 4}
        value={Array.isArray(value) ? value.join("\n") : value}
        {...rest}
    />
);

export const renderSelect = ({
    options,
    labelMap,
    id,
    className,
    ...rest
}: SelectProps) => (
    <select
        id={id}
        className={`${styles.detail_select} ${className ?? ""}`}
        {...rest}
    >
        {options.map((opt) => (
            <option key={opt} value={opt}>
                {labelMap[opt]}
            </option>
        ))}
    </select>
);

export const renderOther = ({ id, className, ...rest }: OtherProps) => (
    <input
        id={id}
        className={`${styles.detail_input} ${className ?? ""}`}
        {...rest}
    />
);

export const InputRenderer: {
    [K in InputTyeps]: (props: InputProps) => JSX.Element;
} = {
    text: renderText,
    textarea: renderTextarea,
    select: renderSelect,
    date: renderOther,
    number: renderOther,
};
