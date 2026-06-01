import {
    InputProps,
    InputTyeps,
    OtherInputProps,
    SelectProps,
    TextareaProps,
    TextInputProps,
} from "@components/Input/types";
import styles from "./Input.module.css";

export const renderText = (id: string, props: TextInputProps) => (
    <input
        id={id}
        type="text"
        className={`${styles.detail_input} ${props.className ?? ""}`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
    />
);

export const renderTextarea = <T extends string | string[]>(
    id: string,
    props: TextareaProps<T>,
) => (
    <textarea
        id={id}
        className={`${styles.detail_input} ${props.className ?? ""}`}
        rows={4}
        value={
            typeof props.value === "string"
                ? props.value
                : props.value.join("\n")
        }
        onChange={(e) =>
            props.onChange(
                typeof props.value === "string"
                    ? (e.target.value as T)
                    : (e.target.value.split("\n") as T),
            )
        }
    />
);

export const renderSelect = <T extends string>(
    id: string,
    props: SelectProps<T>,
) => (
    <select
        id={id}
        className={`${styles.detail_select} ${props.className ?? ""}`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value as T)}
    >
        {props.options.map((opt) => (
            <option key={opt} value={opt}>
                {props.labelMap[opt]}
            </option>
        ))}
    </select>
);

export const renderOther = (id: string, props: OtherInputProps) => (
    <input
        id={id}
        type={props.type}
        className={`${styles.detail_input} ${props.className ?? ""}`}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
    />
);

export const InputRenderer: {
    [K in InputTyeps]: (id: string, props: InputProps) => JSX.Element;
} = {
    text: renderText,
    textarea: renderTextarea,
    select: renderSelect,
    date: renderOther,
    number: renderOther,
};
