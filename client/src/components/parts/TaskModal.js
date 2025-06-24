import React from "react";
import InputModal from "./InputModal";
import { formatToDateInput } from "../../module/dateModule";
import SelectBox from "./SelectBox";

const TaskModal = ({
    show,
    title,
    onClose,
    onSave,
    dynamicFormColumns,
    form,
    handleInputChange,
}) => {
    const getInputValue = (type, value) =>
        type === "date" ? formatToDateInput(value) : value || "";

    const renderInput = ({ key, label, type, option }) => {
        const value = getInputValue(type, form[key]);

        if (type === "select") {
            return (
                <SelectBox
                    label={label}
                    id={key}
                    name={key}
                    value={value}
                    option={option}
                    onChange={handleInputChange}
                />
            );
        }

        return (
            <>
                <label className="form-label">{label}</label>
                <input
                    type={type}
                    className="form-control"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                />
            </>
        );
    };

    return (
        <InputModal show={show} title={title} onClose={onClose} onSave={onSave}>
            <form>
                {dynamicFormColumns.map((column) => (
                    <div className="mb-3" key={column.key}>
                        {renderInput(column)}
                    </div>
                ))}
            </form>
        </InputModal>
    );
};

export default TaskModal;
