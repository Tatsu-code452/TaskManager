import React from "react";
import {
    InputConfig
} from "../types/inputConfig";
import Input from "./Input/Input";

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
    // --- select ---
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

    // --- text ---
    if (input.type === "text") {
        return (
            <Input
                key={input.key}
                type="text"
                label={input.label}
                value={input.value}
                onChange={(v) => onChange(input.key, v as T[K])}
                className={className}
                rowClassName={rowClassName}
                onKeyDown={onKeyDown}
            />
        );
    }

    // --- textarea（string / string[] 両対応）---
    if (input.type === "textarea") {
        if (typeof input.value === "string") {
            // string 用 textarea
            return (
                <Input
                    key={input.key}
                    type="textarea"
                    label={input.label}
                    value={input.value}
                    onChange={(v: string) => onChange(input.key, v as T[K])}
                    className={className}
                    rowClassName={rowClassName}
                />
            );
        }

        // string[] 用 textarea
        return (
            <Input
                key={input.key}
                type="textarea"
                label={input.label}
                value={input.value}
                onChange={(v: string[]) => onChange(input.key, v as T[K])}
                className={className}
                rowClassName={rowClassName}
            />
        );
    }

    // --- date / number ---
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
