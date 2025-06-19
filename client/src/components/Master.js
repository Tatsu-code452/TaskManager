import React, { useState, useEffect, useMemo } from "react";
import useScreenTitle from "./useScreenTitle";
import { fetchApiWithLock, formatDate } from "../module/fetchModule";
import DataTable from "./parts/DataTable";
import Button from "./parts/Button";
import InputModal from "./InputModal";
import useSessionCheck from "./useSessionCheck";

/**
 * 初期フォーム状態の定義
 */
const initialFormState = {
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
};

/**
 * プロジェクト一覧のカラム定義
 */
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
    const [operationType, setOperationType] = useState(null);

    /**
     * エラーハンドリング関数
     */
    const handleError = (error, message) => {
        console.error(message, error);
        alert(message);
    };

    /**
     * プロジェクト一覧を取得
     */
    const fetchProjects = async () => {
        try {
            setData((await fetchApiWithLock("GET", "/projects")) || []);
        } catch (error) {
            handleError(error, "プロジェクトの取得中にエラーが発生しました");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    /**
     * 入力値変更時の処理
     */
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /**
     * フォームのリセット
     */
    const resetForm = () => {
        setForm(initialFormState);
        setShowModal(false);
        setOperationType(null);
    };

    /**
     * データ送信処理 (追加・更新)
     */
    const handleSubmit = async () => {
        if (!form.id && operationType !== "追加") {
            alert("更新するデータを選択してください");
            return;
        }

        try {
            const method = operationType === "追加" ? "POST" : "PUT";
            await fetchApiWithLock(method, `/projects/${form.id}`, {
                data: form,
            });
            await fetchProjects();
            resetForm();
        } catch (error) {
            handleError(error, `${operationType}に失敗しました`);
        }
    };

    /**
     * 削除処理（モーダル不要）
     */
    const handleDelete = async () => {
        if (!form.id) {
            alert("削除するデータを選択してください");
            return;
        }

        if (!window.confirm("本当に削除しますか？")) return;

        try {
            await fetchApiWithLock("DELETE", `/projects/${form.id}`);
            await fetchProjects();
            resetForm();
        } catch (error) {
            handleError(error, "削除に失敗しました");
        }
    };

    // 編集可能なカラムのみ抽出
    const filteredColumns = useMemo(
        () => projectColumns.filter((col) => col.editable),
        []
    );

    /**
     * 日付入力用のフォーマット変換
     */
    const formatToDateInput = useMemo(
        () => (dateString) => {
            if (!dateString) return "";
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },
        []
    );

    return (
        <div className="row justify-content-center">
            <div className="col-md-12">
                <Button
                    text="追加"
                    callback={() => {
                        setOperationType("追加");
                        setForm(initialFormState);
                        setShowModal(true);
                    }}
                />
                <Button
                    text="更新"
                    callback={() => {
                        if (!form.id) {
                            alert("更新するデータを選択してください");
                            return;
                        }
                        setOperationType("更新");
                        setShowModal(true);
                    }}
                />
                <Button text="削除" callback={handleDelete} />
            </div>
            <div className="overflow-scroll col-md-12 border border-2 rounded p-3">
                <DataTable
                    columns={projectColumns}
                    data={data}
                    rowKey="id"
                    onRowSelect={(selectedRow) => setForm(selectedRow)}
                />
            </div>
            {showModal && (
                <InputModal
                    show={showModal}
                    title={operationType}
                    onClose={resetForm}
                    onSave={handleSubmit}
                >
                    <form>
                        {filteredColumns.map((col) => (
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
                                    value={
                                        col.key.toLowerCase().includes("date")
                                            ? formatToDateInput(form[col.key])
                                            : form[col.key] || ""
                                    }
                                    onChange={handleInputChange}
                                    disabled={col.disabled}
                                />
                            </div>
                        ))}
                    </form>
                </InputModal>
            )}
        </div>
    );
}

export default Master;
