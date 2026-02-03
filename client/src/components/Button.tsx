interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
    variant?: "primary" | "secondary";
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
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
            className={`button ${variant}`}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? "処理中..." : children}
        </button>
    );
};
