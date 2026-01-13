import { Dispatch, SetStateAction, useState, MouseEventHandler } from "react";
import {
    success as notifySuccess,
    error as notifyError,
} from "../../../utils/notify";
import { request, login as apiLogin } from "../../../api";

export const useDemoApi = (opts: {
    setCsrfToken: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<string | null>>;
    setLoginResult: Dispatch<SetStateAction<string | null>>;
    setItems: Dispatch<SetStateAction<any[]>>;
    setSelectedId: Dispatch<SetStateAction<number | null>>;
    entity: string;
    newId: string;
    newName: string;
    payloadJson: string;
    selectedId: number | null;
    csrfToken: string;
    setApiResult: Dispatch<SetStateAction<string | null>>;
}) => {
    const { setCsrfToken, setLoading, setLoginResult, setItems, setSelectedId
        , entity, newId, newName, payloadJson, selectedId, csrfToken, setApiResult
    } = opts;

    // CSRFトークン取得
    const fetchCsrfToken = async () => {
        setLoading("csrf");
        try {
            const res = await fetch(`/api/session`, {
                credentials: "include",
            });
            const data = await res.json();
            if (data.csrfToken) setCsrfToken(data.csrfToken);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        }
        finally {
            setLoading(null);
        }
    };

    // ログイン（uses api/auth）
    const handleLogin = async (username: string, password: string) => {
        setLoginResult(null);
        // ensure csrf token is fresh
        await fetchCsrfToken();
        setLoading("login");
        try {
            const res = await apiLogin(username, password);
            setLoginResult(JSON.stringify(res, null, 2));
            notifySuccess("ログイン成功");
            await fetchCsrfToken();
        } catch (err: any) {
            notifyError(err?.message || String(err));
            setLoginResult(String(err));
        } finally {
            setLoading(null);
        }
    };

    // 汎用一覧取得
    const mouseHandleFetch: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        handleFetch(entity);
    };

    // 汎用一覧取得
    const handleFetch = async (entity: string) => {
        setLoading("fetch");
        try {
            const res = await request<{ data: any[] }>(`/${entity}`, {
                method: "GET",
            });
            setItems(res.data || []);
            notifySuccess(`${entity} 一覧取得成功`);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    };


    // 作成APIハンドラ
    const handleCreate = async () => {
        const payload = parsePayload(newId, newName);
        setLoading("create");
        try {
            const res = await request(`/${entity}`, {
                method: "POST",
                body: { data: payload },
            });
            const resText = JSON.stringify(res, null, 2);
            setApiResult(resText);
            notifySuccess(`${entity} 作成成功`);
            await handleFetch(entity);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    };

    // 自動生成ペイロードで作成
    const handleCreateAuto = async () => {
        const payload = defaultPayloadFor(entity);
        setLoading("createAuto");
        try {
            const res = await request(`/${entity}`, {
                method: "POST",
                body: { data: payload },
            });
            const resText = JSON.stringify(res, null, 2);
            setApiResult(resText);
            notifySuccess(`${entity} 自動作成成功`);
            await handleFetch(entity);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    };

    // 更新APIハンドラ
    const handleUpdate = async () => {
        if (selectedId == null) {
            notifyError("更新対象を選択してください");
            return;
        }
        const payload = payloadJson.trim()
            ? JSON.parse(payloadJson)
            : { name: newName || `updated-${Date.now()}` };
        setLoading("update");
        try {
            const res = await request(`/${entity}/${selectedId}`, {
                method: "PUT",
                body: { data: payload },
            });
            const resText = JSON.stringify(res, null, 2);
            setApiResult(resText);
            notifySuccess(`${entity} 更新成功`);
            await handleFetch(entity);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    };

    // 自動生成ペイロードで更新（選択ID を使う）
    const handleUpdateAuto = async () => {
        if (selectedId == null) {
            notifyError("更新対象を選択してください");
            return;
        }
        const payload = defaultPayloadFor(
            entity,
            selectedId,
            `updated-${Date.now()}`
        );
        setLoading("updateAuto");
        try {
            const res = await request(`/${entity}/${selectedId}`, {
                method: "PUT",
                body: { data: payload },
            });
            const resText = JSON.stringify(res, null, 2);
            setApiResult(resText);
            notifySuccess(`${entity} 自動更新成功`);
            await handleFetch(entity);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    };

    // 指定IDを削除（string も許容して数値化する）
    const handleDelete = async (id: number | string) => {
        const idNum = typeof id === "string" ? parseInt(id, 10) : id;
        if (idNum == null || isNaN(Number(idNum))) {
            notifyError("無効なIDです");
            return;
        }
        setLoading(`delete:${idNum}`);
        try {
            const res = await request(`/${entity}/${idNum}`, { method: "DELETE" });
            const resText = JSON.stringify(res, null, 2);
            setApiResult(resText);
            notifySuccess(`${entity} 削除成功`);
            await handleFetch(entity);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    }; 

    // 選択アイテムを削除（自動）
    const handleDeleteSelected = async () => {
        if (selectedId == null) {
            notifyError("削除対象を選択してください");
            return;
        }
        setLoading("deleteSelected");
        try {
            const res = await request(`/${entity}/${selectedId}`, {
                method: "DELETE",
            });
            const resText = JSON.stringify(res, null, 2);
            setApiResult(resText);
            notifySuccess(`${entity} 選択削除成功`);
            setSelectedId(null);
            await handleFetch(entity);
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    };

    // APIリクエスト（例: /protected）
    const handleApiRequest = async () => {
        setApiResult(null);
        setLoading("apiRequest");
        try {
            const res = await fetch(`/api/protected`, {
                method: "GET",
                credentials: "include",
                headers: { "X-CSRF-Token": csrfToken },
            });
            const data = await res.json();
            setApiResult(JSON.stringify(data, null, 2));
        } catch (err: any) {
            notifyError(err?.message || String(err));
        } finally {
            setLoading(null);
        }
    };

    const [presetIndex, setPresetIndex] = useState<number>(0);

    const parsePayload = (idStr: string, nameStr: string) => {
        if (payloadJson.trim()) {
            try {
                return JSON.parse(payloadJson);
            } catch (e: any) {
                notifyError("JSON の解析に失敗しました: " + e.message);
                throw e;
            }
        }
        let idNum: number | undefined = idStr ? parseInt(idStr, 10) : undefined;
        if (typeof idNum === "number" && isNaN(idNum)) {
            idNum = undefined;
        }
        return defaultPayloadFor(entity, idNum, nameStr || undefined);
    }; 

    // デフォルトペイロード生成
    const defaultPayloadFor = (
        entityKey: string,
        id?: number | null,
        name?: string
    ) => {
        const idNum = id ?? undefined;
        switch (entityKey) {
            case "tasks":
                return {
                    id: idNum ?? new Date().getTime() % 100000,
                    name: name || `task-${Date.now()}`,
                    project_id: 1,
                    phase_id: 1,
                    category_id: 1,
                    user_id: 1,
                    planned_start_date: new Date().toISOString().slice(0, 10),
                    planned_end_date: new Date().toISOString().slice(0, 10),
                    planned_effort: 0,
                    status_id: 1,
                    progress_rate: 0,
                    priority: 1,
                };
            case "users":
                return {
                    id: idNum ?? new Date().getTime() % 100000,
                    name: name || `user-${Date.now()}`,
                    password: "password",
                    role: "user",
                };
            case "categories":
                return {
                    id: idNum ?? new Date().getTime() % 100000,
                    name: name || `category-${Date.now()}`,
                };
            case "projects":
                return {
                    id: idNum ?? new Date().getTime() % 100000,
                    name: name || `project-${Date.now()}`,
                    start_date: new Date().toISOString().slice(0, 10),
                    end_date: new Date().toISOString().slice(0, 10),
                };
            case "phases":
                return {
                    id: idNum ?? new Date().getTime() % 100000,
                    name: name || `phase-${Date.now()}`,
                    sort_no: 0,
                };
            case "statuses":
                return {
                    id: idNum ?? new Date().getTime() % 100000,
                    name: name || `status-${Date.now()}`,
                    color: "#000000",
                };
            default:
                return { id: idNum ?? undefined, name };
        }
    };

    const SAMPLE_PRESETS: Record<
        string,
        Array<{ label: string; payload: any }>
    > = {
        tasks: [
            {
                label: "タスク(最小)",
                payload: {
                    name: "Sample Task",
                    project_id: 1,
                    phase_id: 1,
                    category_id: 1,
                    user_id: 1,
                    planned_start_date: new Date().toISOString().slice(0, 10),
                    planned_end_date: new Date().toISOString().slice(0, 10),
                    status_id: 1,
                },
            },
            { label: "タスク(フル)", payload: defaultPayloadFor("tasks") },
        ],
        users: [
            {
                label: "ユーザー(最小)",
                payload: {
                    name: "sample-user",
                    password: "password",
                    role: "user",
                },
            },
        ],
        categories: [{ label: "カテゴリ(例)", payload: { name: "Design" } }],
        projects: [
            {
                label: "プロジェクト(例)",
                payload: {
                    name: "Sample Project",
                    start_date: new Date().toISOString().slice(0, 10),
                    end_date: new Date().toISOString().slice(0, 10),
                },
            },
        ],
        phases: [
            {
                label: "フェーズ(例)",
                payload: { name: "Analysis", sort_no: 0 },
            },
        ],
        statuses: [
            {
                label: "ステータス(例)",
                payload: { name: "Open", color: "#ff0000" },
            },
        ],
    };


    return {
        fetchCsrfToken, handleLogin, mouseHandleFetch, handleFetch, defaultPayloadFor,
        handleCreate, handleCreateAuto, handleUpdate, handleUpdateAuto,
        handleDelete, handleDeleteSelected, handleApiRequest, presetIndex, setPresetIndex,
        SAMPLE_PRESETS
    };

}