import React from "react";

interface InputDateProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const InputDate = ({ label, value, onChange }: InputDateProps) => (
    <label>
        {label}
        <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </label>
);

export default React.memo(InputDate);
