import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
    variant?: "primary" | "secondary" | "danger";
    loading?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    onClick,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <span className={styles.spinner}>
                    <span className={styles["spinner-inner"]} />
                </span>
            ) : (
                children
            )}
        </button>
    );
};
