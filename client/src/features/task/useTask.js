import { useState, useCallback } from "react";
import { fetchApiWithLock } from "../../module/fetchModule";
import { formatDate } from "../../module/dateModule";
import useInputModal from "../../components/hooks/useInputModal";

/**
 * 初期フォーム状態の定義
 */
const initialFormState = {
    id: "",
    project_id: "",
    phase_id: "",
    category_id: "",
    user_id: "",
    title: "",
    description: "",
    planned_start_date: "",
    planned_end_date: "",
    effort: "",
};

const formColumns = [
    { key: "project_id", label: "案件名", type: "select", option: [] },
    { key: "phase_id", label: "フェーズ名", type: "select", option: [] },
    { key: "category_id", label: "カテゴリ", type: "select", option: [] },
    { key: "user_id", label: "担当者", type: "select", option: [] },
    { key: "title", label: "タスク名", type: "text" },
    { key: "description", label: "説明", type: "text" },
    { key: "planned_start_date", label: "開始日", type: "date" },
    { key: "planned_end_date", label: "終了日", type: "date" },
    { key: "effort", label: "工数", type: "text" },
];

const columns = [
    { key: "projectName", label: "案件名" },
    { key: "phaseName", label: "フェーズ名" },
    { key: "taskId", label: "タスクID" },
    { key: "title", label: "タスク名" },
    { key: "assignee", label: "担当者" },
    { key: "category", label: "カテゴリ" },
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
    { key: "workload", label: "工数" },
    { key: "description", label: "説明" },
    {
        key: "createDate",
        label: "作成日時",
        format: (d) => formatDate(d, false),
    },
    {
        key: "updateDate",
        label: "更新日時",
        format: (d) => formatDate(d, false),
    },
];

// --- 共通バリデーション関数 ---
const validateForm = (form) => {
    const { planned_start_date, planned_end_date } = form;
    if (!planned_start_date || !planned_end_date) {
        return "開始日と終了日は必須です";
    }
    if (new Date(planned_start_date) > new Date(planned_end_date)) {
        return "開始日は終了日より前でなければなりません";
    }
    return null;
};

// --- API操作の共通関数 ---
const apiActions = {
    create: (form) => fetchApiWithLock("POST", "/tasks", { data: form }),
    edit: (form) =>
        fetchApiWithLock("PUT", `/tasks/${form.id}`, { data: form }),
    delete: (id) => fetchApiWithLock("DELETE", `/tasks/${id}`),
    fetch: () => fetchApiWithLock("GET", "/tasks"),
};

const useTask = () => {
    const {
        showModal,
        form,
        operationType,
        handleFormChange,
        openModal,
        closeModal,
    } = useInputModal(initialFormState);

    const [data, setData] = useState([]);
    const [dynamicFormColumns, setDynamicFormColumns] = useState(formColumns);

    // データの取得
    const fetchData = useCallback(async () => {
        try {
            const result = await apiActions.fetch();
            setData(result.data || []);

            const selectOptionsMap = {
                project_id: result.data.projects?.map((row) => ({
                    value: row.id,
                    name: row.name,
                })),
                phase_id: result.data.phases?.map((row) => ({
                    value: row.id,
                    name: row.name,
                })),
                category_id: result.data.categories?.map((row) => ({
                    value: row.id,
                    name: row.name,
                })),
                user_id: result.data.users?.map((row) => ({
                    value: row.id,
                    name: row.display_name,
                })),
            };

            const updatedColumns = formColumns.map((col) =>
                selectOptionsMap[col.key]
                    ? { ...col, option: selectOptionsMap[col.key] }
                    : col
            );

            setDynamicFormColumns(updatedColumns);
        } catch (error) {
            console.error("データ取得エラー:", error);
        }
    }, []);

    // データの保存
    const saveData = useCallback(async () => {
        const errorMsg = validateForm(form);
        if (errorMsg) {
            alert(errorMsg);
            return;
        }
        try {
            const action =
                operationType === "create"
                    ? apiActions.create
                    : apiActions.edit;
            await action(form);
            await fetchData();
            closeModal();
        } catch (error) {
            console.error("データ保存エラー:", error);
        }
    }, [operationType, form, fetchData, closeModal]);

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
        dynamicFormColumns,
        handleFormChange,
        openModal,
        closeModal,
        saveData,
        deleteData,
        fetchData,
    };
};

export default useTask;
