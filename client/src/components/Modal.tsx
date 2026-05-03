import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
};

export const Modal = ({ title, children, onClose }: ModalProps) => {
    return (
        <div
            role="dialog"
            className={styles.overlay}
            onClick={onClose}
            onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
            }}
        >
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className={styles.title}>{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default React.memo(Modal);
