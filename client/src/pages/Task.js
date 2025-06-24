import React, { useEffect } from "react";
import useScreenTitle from "../hooks/useScreenTitle";
import useSessionCheck from "../hooks/useSessionCheck";
import DataTable from "../components/parts/DataTable";
import Button from "../components/parts/Button";
import TaskModal from "../components/parts/TaskModal";
import useTask from "../features/task/useTask";

function Task() {
    useSessionCheck();
    useScreenTitle("タスク一覧");
    const {
        data,
        showModal,
        form,
        operationType,
        columns,
        dynamicFormColumns,
        handleFormChange,
        openModal,
        closeModal,
        saveData,
        deleteData,
        fetchData,
    } = useTask();

    // 初回マウント時にデータ取得
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div className="col-md-12 mb-3 d-flex gap-2 flex-wrap">
                <Button text="追加" onClick={() => openModal("create")} />
                <Button text="更新" onClick={() => openModal("edit", form)} />
                <Button text="削除" onClick={() => deleteData(form.id)} />
            </div>
            <div className="overflow-scroll col-md-12 border border-2 rounded p-3">
                <DataTable columns={columns} data={data.tasks} rowKey="taskId" />
            </div>
            {showModal && (
                <TaskModal
                    show={showModal}
                    title={operationType}
                    onClose={closeModal}
                    onSave={saveData}
                    dynamicFormColumns={dynamicFormColumns}
                    form={form}
                    handleInputChange={handleFormChange}
                />
            )}
        </>
    );
}

export default Task;
