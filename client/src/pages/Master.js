import React, { useMemo, useEffect } from "react";
import useScreenTitle from "../hooks/useScreenTitle";
import useSessionCheck from "../hooks/useSessionCheck";
import DataTable from "../components/parts/DataTable";
import Button from "../components/parts/Button";
import ProjectMasterModal from "../components/parts/ProjectMasterModal";
import useProjectMaster from "../features/master/useProjectMaster";

const Master = () => {
    useSessionCheck();
    useScreenTitle("マスタ管理");
    const {
        data,
        showModal,
        form,
        operationType,
        columns,
        filteredColumns,
        handleFormChange,
        openModal,
        closeModal,
        saveData,
        deleteData,
        fetchData,
    } = useProjectMaster();

    // 初回マウント時にデータ取得
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div className="col-md-12 mb-3 d-flex gap-2 flex-wrap">
                <Button text="追加" callback={() => openModal("create")} />
                <Button text="更新" callback={() => openModal("edit", form)} />
                <Button text="削除" callback={() => deleteData(form.id)} />
            </div>
            <div className="overflow-scroll col-md-12 border border-2 rounded p-3">
                <DataTable
                    columns={columns}
                    data={data}
                    rowKey="id"
                    onRowSelect={(e, row) => handleFormChange(e, row)}
                />
            </div>
            {showModal && (
                <ProjectMasterModal
                    show={showModal}
                    title={operationType}
                    onClose={closeModal}
                    onSave={saveData}
                    filteredColumns={filteredColumns}
                    form={form}
                    handleInputChange={handleFormChange}
                />
            )}
        </>
    );
};

export default Master;
