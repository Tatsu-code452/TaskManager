import React, { memo, useEffect, useCallback } from "react";

const modalOverlayStyle = { background: "rgba(0,0,0,0.5)" };

/**
 * 入力モーダルイベント
 * @param {boolean} props.show - モーダル表示状態
 * @param {Function} props.onClose - 閉じるボタン押下時の処理
 * @returns
 */
const InputModalEvent = (show, onClose) => {
    // Escapeキー押下時にモーダルを閉じる
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        if (show) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [show, handleKeyDown]);

    return {
        handleKeyDown,
    };
};

/**
 * 入力モーダルヘッダーコンポーネント
 * @param {string} props.title - モーダルタイトル
 * @param {Function} props.onClose - 閉じるボタン押下時の処理
 * @returns {JSX.Element}
 */
const InputModalHeader = ({ title, onClose }) => {
    return (
        <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
                type="button"
                className="btn-close"
                onClick={onClose}
            ></button>
        </div>
    );
};

/**
 * 入力モーダルフッターコンポーネント
 * @param {Function} props.onClose - 閉じるボタン押下時の処理
 * @param {Function} props.onSave - 保存ボタン押下時の処理
 * @param {boolean} [props.saveDisabled=false] - 保存ボタンの無効化状態
 * @returns {JSX.Element}
 */
const InputModalFooter = ({ onClose, onSave, saveDisabled }) => {
    return (
        <div className="modal-footer">
            <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
            >
                閉じる
            </button>
            <button
                type="button"
                className="btn btn-success"
                onClick={onSave}
                disabled={saveDisabled}
            >
                保存
            </button>
        </div>
    );
};

/**
 * 汎用入力モーダルコンポーネント
 * @param {Object} props
 * @param {boolean} props.show - モーダル表示状態
 * @param {string} props.title - モーダルタイトル
 * @param {Function} props.onClose - 閉じるボタン押下時の処理
 * @param {Function} props.onSave - 保存ボタン押下時の処理
 * @param {React.ReactNode} props.children - モーダル本体の中身
 * @param {boolean} [props.saveDisabled=false] - 保存ボタンの無効化状態
 * @returns {JSX.Element|null}
 */
const InputModal = ({
    show,
    title,
    onClose,
    onSave,
    children,
    saveDisabled = false,
}) => {
    InputModalEvent(show, onClose);

    if (!show) return null;

    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={modalOverlayStyle}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <InputModalHeader title={title} onClose={onClose} />
                    <div className="modal-body">{children}</div>
                    <InputModalFooter
                        onClose={onClose}
                        onSave={onSave}
                        saveDisabled={saveDisabled}
                    />
                </div>
            </div>
        </div>
    );
};
export default memo(InputModal);
