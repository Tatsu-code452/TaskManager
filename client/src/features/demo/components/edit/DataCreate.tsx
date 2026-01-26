import React from "react";

export interface DataCreateProps {
    dataCreateFormInput: React.ReactNode;
    dataCreatePreset: React.ReactNode;
    dataCreateForm: React.ReactNode;
}

// データ作成コンポーネント
const DataCreate = (props: DataCreateProps) => {
    const { dataCreateFormInput, dataCreatePreset, dataCreateForm } = props;

    return (
        <>
            <div className="form-row">{dataCreatePreset}</div>

            <div className="form-row">{dataCreateFormInput}</div>

            <div className="form-row">{dataCreateForm}</div>
        </>
    );
};

export default React.memo(DataCreate);
