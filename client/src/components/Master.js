import React, { useState, useEffect, useCallback, useMemo } from "react";
import useScreenTitle from "./useScreenTitle";
import { fetchApiWithLock, formatDate } from "../module/fetchModule";
import DataTable from "./parts/DataTable";
import Button from "./parts/Button";
import InputModal from "./InputModal";
import useSessionCheck from "./useSessionCheck";

const initialFormState = {
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
};

const projectColumns = [
    { key: "id", label: "ID", disabled: true, hidden: true, editable: false },
    { key: "name", label: "プロジェクト名", editable: true },
    { key: "description", label: "説明", editable: true },
    {
        key: "startDate",
        label: "開始日",
        editable: true,
        format: (d) => formatDate(d, false),
    },
    {
        key: "endDate",
        label: "終了日",
        editable: true,
        format: (d) => formatDate(d, false),
    },
    {
        key: "createDate",
        label: "作成日時",
        editable: false,
        format: (d) => formatDate(d, false),
    },
    {
        key: "updateDate",
        label: "更新日時",
        editable: false,
        format: (d) => formatDate(d, false),
    },
];

function Master() {
    useSessionCheck();
    useScreenTitle("マスタ管理");

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialFormState);

    const handleError = useCallback((error, message) => {
        console.error(message, error);
        alert(message);
    }, []);

    const fetchProjects = useCallback(async () => {
        try {
            setData((await fetchApiWithLock("GET", "/projects")) || []);
        } catch (error) {
            handleError(error, "プロジェクトの取得中にエラーが発生しました");
        }
    }, [handleError]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = useCallback(() => {
        setForm(initialFormState);
        setShowModal(false);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetchApiWithLock("POST", "/projects", { data: form });
            await fetchProjects();
            resetForm();
        } catch (error) {
            handleError(error, "登録に失敗しました");
        }
    };

    const filteredColumns = useMemo(
        () => projectColumns.filter((col) => col.editable),
        []
    );

    return (
        <div className="row justify-content-center">
            <div className="col-md-12">
                <Button text="追加" callback={() => setShowModal(true)} />
            </div>
            <div className="overflow-scroll col-md-12 border border-2 rounded p-3">
                <DataTable columns={projectColumns} data={data} rowKey="id" />
            </div>
            <InputModal
                show={showModal}
                title={"新規追加"}
                onClose={resetForm}
                onSave={handleSubmit}
            >
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
                                value={form[col.key] || ""}
                                onChange={handleInputChange}
                                disabled={col.disabled}
                            />
                        </div>
                    ))}
                </form>
            </InputModal>
        </div>
    );
}

export default Master;
