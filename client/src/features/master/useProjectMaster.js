import { useState, useCallback, useMemo } from "react";
import { fetchApiWithLock, formatDate } from "../../module/fetchModule";
import useInputModal from "../../components/hooks/useInputModal";

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
const columns = [
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

// --- 共通バリデーション関数 ---
const validateForm = (form, type = "create") => {
    if (type === "edit" && !form.id) {
        return "更新するデータを選択してください";
    }
    if (!form.name) {
        return "プロジェクト名は必須です";
    }
    if (!form.startDate || !form.endDate) {
        return "開始日と終了日は必須です";
    }
    if (new Date(form.startDate) > new Date(form.endDate)) {
        return "開始日は終了日より前でなければなりません";
    }
    return null;
};

// --- API操作の共通関数 ---
const apiActions = {
    create: (form) => fetchApiWithLock("POST", "/projects", { data: form }),
    edit: (form) =>
        fetchApiWithLock("PUT", `/projects/${form.id}`, { data: form }),
    delete: (id) => fetchApiWithLock("DELETE", `/projects/${id}`),
    fetch: () => fetchApiWithLock("GET", "/projects"),
};

const useProjectMaster = () => {
    const {
        showModal,
        form,
        operationType,
        handleFormChange,
        openModal,
        closeModal,
    } = useInputModal(initialFormState);

    const [data, setData] = useState([]);

    // 編集可能なカラムのみ抽出
    const filteredColumns = useMemo(
        () => columns.filter((col) => col.editable),
        []
    );

    // データの取得
    const fetchData = useCallback(async () => {
        try {
            const result = await apiActions.fetch();
            setData(result || []);
        } catch (error) {
            console.error("データ取得エラー:", error);
        }
    }, []);

    // データの保存
    const saveData = useCallback(async () => {
        const errorMsg = validateForm(form, operationType);
        if (errorMsg) {
            alert(errorMsg);
            return;
        }
        try {
            if (operationType === "create") {
                await apiActions.create(form);
            } else if (operationType === "edit") {
                await apiActions.edit(form);
            }
            await fetchData();
            closeModal();
        } catch (error) {
            console.error("データ保存エラー:", error);
        }
    }, [operationType, form, fetchData]);

    // データの削除
    const deleteData = useCallback(
        async (id) => {
            if (!id) {
                alert("削除するデータを選択してください");
                return;
            }
            if (!window.confirm("本当に削除しますか？")) return;
            try {
                await apiActions.delete(id);
                await fetchData();
            } catch (error) {
                console.error("データ削除エラー:", error);
            }
        },
        [fetchData]
    );

    return {
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
    };
};

export default useProjectMaster;
