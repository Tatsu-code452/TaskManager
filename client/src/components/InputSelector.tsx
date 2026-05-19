import React from "react";
import { InputConfig } from "../types/inputConfig";
import Input from "./Input";

interface InputSelectorProps<K extends string, T extends Record<K, unknown>> {
    input: InputConfig<K>;
    onChange: (key: K, value: T[K]) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    className?: string;
    rowClassName?: string;
}

export const InputSelector = <K extends string, T extends Record<K, unknown>>({
    input,
    onChange,
    onKeyDown,
    className,
    rowClassName,
}: InputSelectorProps<K, T>) => {
    if (input.type === "select") {
        return (
            <Input
                key={input.key}
                type="select"
                label={input.label}
                value={input.value}
                options={input.options}
                labelMap={input.labelMap}
                onChange={(v) => onChange(input.key, v as T[K])}
                className={className}
                rowClassName={rowClassName}
            />
        );
    }

    if (input.type === "text") {
        return (
            <Input
                key={input.key}
                type={input.type}
                label={input.label}
                value={input.value}
                onChange={(v) => onChange(input.key, v as T[K])}
                className={className}
                rowClassName={rowClassName}
                onKeyDown={onKeyDown}
            />
        );
    }
    return (
        <Input
            key={input.key}
            type={input.type}
            label={input.label}
            value={input.value}
            onChange={(v) => onChange(input.key, v as T[K])}
            className={className}
            rowClassName={rowClassName}
        />
    );
};

export default React.memo(InputSelector);
