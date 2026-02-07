import React from "react";
import DataCreateForm from "../DataCreateForm";
import { createDataCreateFormProps } from "../DataCreateForm/factory";
import DataCreateFormInput from "../DataCreateFormInput";
import { createDataCreateFormInputProps } from "../DataCreateFormInput/factory";
import DataCreatePreset from "../DataCreatePreset";
import { createDataCreatePresetProps } from "../DataCreatePreset/factory";
import { DataCreateProps } from "./types";

const DataCreate = (props: DataCreateProps) => {
    const { crud, dataCreateFormHandler } = props;

    return (
        <>
            <div className="form-row">
                <DataCreateFormInput
                    {...createDataCreateFormInputProps(crud)}
                />
            </div>

            <div className="form-row">
                <DataCreatePreset {...createDataCreatePresetProps(crud)} />
            </div>

            <div className="form-row">
                <DataCreateForm
                    {...createDataCreateFormProps(dataCreateFormHandler)}
                />
            </div>
        </>
    );
};

export default React.memo(DataCreate);
