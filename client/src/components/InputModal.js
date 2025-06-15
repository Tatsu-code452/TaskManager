import React from "react";

function InputModal({ show, title, onClose, onSave, children, saveDisabled }) {
    if (!show) return null;
    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ background: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">{children}</div>
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
                </div>
            </div>
        </div>
    );
}

export default InputModal;
