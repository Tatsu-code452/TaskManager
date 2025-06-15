import React, { useState, useEffect } from "react";
import useScreenTitle from "./useScreenTitle";
import { fetchApiWithLock, formatDate } from "../module/fetchModule";
import DataTable from "./parts/DataTable";
import Button from "./parts/Button";
import InputModal from "./InputModal";
import useSessionCheck from "./useSessionCheck";

function MasterEdit() {
    useSessionCheck();
    useScreenTitle("マスタ管理");
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        id: "",
        name: "",
        description: "",
        startDate: "",
        endDate: "",
    });

    // プロジェクト一覧取得
    useEffect(() => {
        (async () => {
            try {
                setData((await fetchApiWithLock("GET", "/projects")) || []);
            } catch (error) {
                console.error(
                    "プロジェクトの取得中にエラーが発生しました:",
                    error
                );
                alert("プロジェクトの取得中にエラーが発生しました");
            }
        })();
    }, []);

    const projectColumns = [
        {
            key: "id",
            label: "ID",
            disabled: true,
            hidden: true,
            editable: false,
        },
        {
            key: "name",
            label: "プロジェクト名",
            disabled: false,
            hidden: false,
            editable: true,
        },
        {
            key: "description",
            label: "説明",
            disabled: false,
            hidden: false,
            editable: true,
        },
        {
            key: "startDate",
            label: "開始日",
            disabled: false,
            hidden: false,
            editable: true,
            format: (d) => formatDate(d, false),
        },
        {
            key: "endDate",
            label: "終了日",
            disabled: false,
            hidden: false,
            editable: true,
            format: (d) => formatDate(d, false),
        },
        {
            key: "createDate",
            label: "作成日時",
            disabled: true,
            hidden: false,
            editable: false,
            format: (d) => formatDate(d, false),
        },
        {
            key: "updateDate",
            label: "更新日時",
            disabled: true,
            hidden: false,
            editable: false,
            format: (d) => formatDate(d, false),
        },
    ];

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetchApiWithLock("POST", "/projects", { data: form });
            // 登録後、一覧を再取得
            setData((await fetchApiWithLock("GET", "/projects")) || []);
            setShowModal(false);
            setForm({
                id: "",
                name: "",
                description: "",
                startDate: "",
                endDate: "",
            });
        } catch (error) {
            alert("登録に失敗しました");
        }
    };

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
                onClose={() => setShowModal(false)}
                onSave={handleSubmit}
            >
                <form>
                    {projectColumns
                        .filter((col) => col.editable === true)
                        .map((col) => (
                            <div className="mb-3" key={col.key}>
                                <label className="form-label">
                                    {col.label}
                                </label>
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

export default MasterEdit;
