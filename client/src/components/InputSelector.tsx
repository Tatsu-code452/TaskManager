import React from "react";
import { InputConfig } from "../types/inputConfig";
import Input from "./Input";

interface InputSelectorProps<T extends string, K extends string> {
    input: InputConfig<K>;
    onChange: (key: string, value: T) => void;
}

export const InputSelector = <T extends string, K extends string>({
    input,
    onChange,
}: InputSelectorProps<T, K>) => {
    if (input.type === "select") {
        return (
            <Input
                key={input.key}
                type="select"
                label={input.label}
                value={input.value}
                options={input.options}
                labelMap={input.labelMap}
                onChange={(v) => onChange(input.key, v as T)}
            />
        );
    }
    return (
        <Input
            key={input.key}
            type={input.type}
            label={input.label}
            value={input.value}
            onChange={(v) => onChange(input.key, v as T)}
        />
    );
};

export default React.memo(InputSelector);
