import InputSelector from "@components/InputSelector";
import { InputConfig } from "../../../types/inputConfig";

export const InputSelectors = <T extends string>({
    inputs,
    className,
    rowClassName,
    onChange,
    onKeyDown,
}: {
    inputs: InputConfig<T>[];
    className?: string;
    rowClassName?: string;
    onChange?: (key: string, value: string) => void;
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
