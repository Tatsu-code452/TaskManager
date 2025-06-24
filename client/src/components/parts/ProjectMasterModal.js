import React from "react";
import InputModal from "./InputModal";
import { formatToDateInput } from "../../module/dateModule";

const ProjectMasterModal = ({
    show,
    title,
    onClose,
    onSave,
    filteredColumns,
    form,
    handleInputChange,
}) => {
    const getInputType = (key) =>
        key.toLowerCase().includes("date") ? "date" : "text";

    const getInputValue = (key) =>
        getInputType(key) === "date"
            ? formatToDateInput(form[key])
            : form[key] || "";

    return (
        <InputModal show={show} title={title} onClose={onClose} onSave={onSave}>
            <form>
                {filteredColumns.map(({ key, label, disabled }) => (
                    <div className="mb-3" key={key}>
                        <label className="form-label">{label}</label>
                        <input
                            type={getInputType(key)}
                            className="form-control"
                            name={key}
                            value={getInputValue(key)}
                            onChange={handleInputChange}
                            disabled={disabled}
                        />
                    </div>
                ))}
            </form>
        </InputModal>
    );
};

export default ProjectMasterModal;
