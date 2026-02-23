import styles from "./Input.module.css";

interface InputProps {
    id: string;
    label?: string;
    hideLabel?: boolean;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export const Input = ({
    id,
    label = "",
    hideLabel = false,
    type = "text",
    placeholder = "",
    value,
    onChange,
}: InputProps) => {
    return (
        <div className={styles["input-wrapper"]}>
            {!hideLabel && <label htmlFor={id}>{label}</label>}
            {hideLabel && (
                <label htmlFor={id} className="sr-only">
                    {label}
                </label>
            )}

            <input
                id={id}
                className={styles["input"]}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                aria-label={label}
            />
        </div>
    );
};
