import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    icon?: boolean;
};

export const Button = ({
    children,
    onClick,
    type = "button",
    className = "",
    variant = "primary",
    icon = false,
    ...rest
}: ButtonProps) => {
    const classNameList = [
        icon ? styles.icon_button : styles.button,
        !icon && styles[`button_${variant}`],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={classNameList}
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    );
};

export default React.memo(Button);
