import React, { useMemo } from "react";
import InputModal from "./InputModal";

const ProjectMasterModal = ({
    show,
    title,
    onClose,
    onSave,
    filteredColumns,
    form,
    handleInputChange,
}) => {
    // 日付入力用のフォーマット変換
    const formatToDateInput = useMemo(
        () => (dateString) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            if (isNaN(date)) return "";
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },
        []
    );

    return (
        <InputModal show={show} title={title} onClose={onClose} onSave={onSave}>
            <form>
                {filteredColumns.map((col) => (
                    <div className="mb-3" key={col.key}>
                        <label className="form-label">{col.label}</label>
                        <input
                            type={
                                col.key.toLowerCase().includes("date")
                                    ? "date"
                                    : "text"
                            }
                            className="form-control"
                            name={col.key}
                            value={
                                col.key.toLowerCase().includes("date")
                                    ? formatToDateInput(form[col.key])
                                    : form[col.key] || ""
                            }
                            onChange={(e) => handleInputChange(e)}
                            disabled={col.disabled}
                        />
                    </div>
                ))}
            </form>
        </InputModal>
    );
};

export default ProjectMasterModal;
