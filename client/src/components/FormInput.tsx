interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
}

export const FormInput = ({
    id,
    label,
    type = "text",
    value,
    onChange,
}: FormInputProps) => {
    return (
        <div className="form-row">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                className="input"
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                aria-label={id}
            />
        </div>
    );
};
