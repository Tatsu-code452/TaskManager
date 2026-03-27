import React from "react";
import styles from "./Input.module.css";

type BaseProps = {
    label?: string;
    className?: string;
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

type TextInputProps = BaseProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
        type: "text" | "date" | "number";
        value: string;
        onChange: (value: string) => void;
    };

export type InputProps<T extends string = string> =
    | SelectProps<T>
    | TextareaProps
    | TextInputProps;

export const Input = <T extends string>(props: InputProps<T>) => {
    const { label, className } = props;

    return (
        <div className={styles.detail_row}>
            {label && <label className={styles.detail_label}>{label}</label>}

            {props.type === "select" && (
                <select
                    className={`${styles.detail_select} ${className ?? ""}`}
                    value={props.value as T}
                    onChange={(e) => props.onChange(e.target.value as T)}
                >
                    {props.options.map((opt) => (
                        <option key={opt} value={opt}>
                            {props.labelMap[opt as T]}
                        </option>
                    ))}
                </select>
            )}

            {props.type === "textarea" && (
                <textarea
                    className={`${styles.detail_input} ${className ?? ""}`}
                    rows={4}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value as T)}
                />
            )}

            {props.type !== "select" && props.type !== "textarea" && (
                <input
                    {...props}
                    className={`${styles.detail_input} ${className ?? ""}`}
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value as T)}
                />
            )}
        </div>
    );
};

export default React.memo(Input);
