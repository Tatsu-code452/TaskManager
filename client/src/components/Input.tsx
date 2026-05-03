import React from "react";
import styles from "./Input.module.css";

type BaseProps = {
    label?: string;
    className?: string;
    rowClassName?: string;
};

type SelectProps<T extends string> = BaseProps & {
    type: "select";
    value: T;
    options: readonly T[];
    labelMap: Record<T, string>;
    onChange: (value: T) => void;
};

type TextareaProps = BaseProps & {
    type: "textarea";
    value: string;
    onChange: (value: string) => void;
};

type TextInputProps = BaseProps & {
    type: "text";
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

type OtherInputProps = BaseProps & {
    type: "date" | "number";
    value: string;
    onChange: (value: string) => void;
};

export type InputProps<T extends string = string> =
    | SelectProps<T>
    | TextareaProps
    | TextInputProps
    | OtherInputProps;

export const Input = <T extends string>(props: InputProps<T>) => {
    const { label, className, rowClassName } = props;

    return (
        <div className={`${styles.detail_row} ${rowClassName ?? ""}`}>
            {label && <label className={styles.detail_label}>{label}</label>}

            {props.type === "select" && (
                <select
                    className={`${styles.detail_select} ${className ?? ""}`}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value as T)}
                >
                    {props.options.map((opt) => (
                        <option key={opt} value={opt}>
                            {props.labelMap[opt]}
                        </option>
                    ))}
                </select>
            )}

            {props.type === "textarea" && (
                <textarea
                    className={`${styles.detail_input} ${className ?? ""}`}
                    rows={4}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            )}

            {props.type === "text" && (
                <input
                    type="text"
                    className={`${styles.detail_input} ${className ?? ""}`}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    onKeyDown={props.onKeyDown}
                />
            )}

            {(props.type === "date" || props.type === "number") && (
                <input
                    type={props.type}
                    className={`${styles.detail_input} ${className ?? ""}`}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            )}
        </div>
    );
};

export default React.memo(Input);
