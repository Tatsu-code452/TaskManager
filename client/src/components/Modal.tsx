import React from "react";
import styles from "./Modal.module.css";

type ModalProps = {
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
};

export const Modal = ({ title, children, onClose }: ModalProps) => {
    return (
        <div className={styles.overlay} onClick={onClose}>
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
