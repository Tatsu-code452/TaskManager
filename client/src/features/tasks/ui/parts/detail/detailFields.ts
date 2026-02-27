import { TaskRowEditForm, TaskRowViewData } from "../../../types/types";

export const viewFields: {
    viewId: keyof TaskRowViewData;
    label: string;
}[] = [
        { viewId: "projectId", label: "プロジェクト" },
        { viewId: "phaseId", label: "フェーズ" },
        { viewId: "categoryId", label: "カテゴリ" },
        { viewId: "userId", label: "担当者" },
        { viewId: "planned", label: "計画期間" },
        { viewId: "actual", label: "実績期間" },
        { viewId: "progressRate", label: "進捗率" },
        { viewId: "priority", label: "優先度" },
    ];

export const editFields: {
    editId: keyof TaskRowEditForm;
    label: string;
    inputType?: "text" | "number" | "date";
}[] = [
        { editId: "name", label: "名称" },
        { editId: "projectId", label: "プロジェクト" },
        { editId: "phaseId", label: "フェーズ" },
        { editId: "userId", label: "担当者" },
        { editId: "plannedStart", label: "計画開始日", inputType: "date" },
        { editId: "plannedEnd", label: "計画終了日", inputType: "date" },
        { editId: "actualStart", label: "実績開始日", inputType: "date" },
        { editId: "actualEnd", label: "実績終了日", inputType: "date" },
        { editId: "progressRate", label: "進捗率", inputType: "number" },
        { editId: "priority", label: "優先度", inputType: "number" },
    ];

