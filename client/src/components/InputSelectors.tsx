import InputSelector from "@components/InputSelector";
import { InputConfig } from "@comtypes/inputConfig";
import { memo } from "react";

export const InputSelectors = <K extends string, T extends Record<K, unknown>>({
    inputs,
    className,
    rowClassName,
    onChange,
    onKeyDown,
}: {
    inputs: InputConfig<K>[];
    className?: string;
    rowClassName?: string;
    onChange?: (key: K, value: T[K]) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
}) => {
    return inputs.map((input) => (
        <InputSelector
            key={input.key}
            input={input}
            className={className}
            rowClassName={rowClassName}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    ));
};

export default memo(InputSelectors);
