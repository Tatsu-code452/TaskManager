import React from "react";
import "./SimpleApiDemo.css";
import { ENTITIES } from "./const/MemoConst";
import { useDemoState } from "./hooks/useDemoState";
import { useDemoApi } from "./hooks/useDemoApi";

const SimpleApiDemo: React.FC = () => {
    const {
        username,
        setUsername,
        password,
        setPassword,
        csrfToken,
        setCsrfToken,
        loginResult,
        setLoginResult,
        apiResult,
        setApiResult,
        entity,
        setEntity,
        items,
        setItems,
        newId,
        setNewId,
        newName,
        setNewName,
        payloadJson,
        setPayloadJson,
        selectedId,
        setSelectedId,
        loading,
        setLoading,
    } = useDemoState();

    const {
        fetchCsrfToken,
        handleLogin,
        handleFetch,
        mouseHandleFetch,
        defaultPayloadFor,
        handleCreate,
        handleCreateAuto,
        handleUpdate,
        handleUpdateAuto,
        handleDelete,
        handleDeleteSelected,
        handleApiRequest,
        presetIndex,
        setPresetIndex,
        SAMPLE_PRESETS,
    } = useDemoApi({
        setCsrfToken,
        setLoading,
        setLoginResult,
        setItems,
        setSelectedId,
        entity,
        newId,
        newName,
        payloadJson,
        selectedId,
        csrfToken,
        setApiResult,
    });

    return (
        <div className="demo-container">
            <h2 className="demo-title">簡易APIデモ画面</h2>
            <div className="form-row">
                <label htmlFor="username-input">ユーザー名: </label>
                <input
                    id="username-input"
                    className="input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-row">
                <label htmlFor="password-input">パスワード: </label>
                <input
                    id="password-input"
                    className="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleLogin(username, password);
                        }
                    }}
                />
            </div>
            <div className="controls">
                <button
                    type="button"
                    className={`button primary`}
                    onClick={() => handleLogin(username, password)}
                    disabled={loading === "login"}
                >
                    {loading === "login" ? "ログイン中…" : "ログイン"}
                </button>
            </div>
                    
            <div style={{ marginTop: 12 }}>
                <label>ログイン結果</label>
                <pre
                    aria-live="polite"
                    aria-atomic="true"
                    className="response-pre"
                >
                    {loginResult}
                </pre>
            </div>
            <hr />

            <div className="form-row">
                <button
                    type="button"
                    className="button secondary"
                    onClick={fetchCsrfToken}
                    disabled={loading === "csrf"}
                >
                    {loading === "csrf" ? "取得中…" : "CSRFトークン取得"}
                </button>
                <span className="token-box">{csrfToken || "なし"}</span>
            </div>

            <hr />

            <h3>汎用 CRUD デモ</h3>

            <div className="form-row">
                <label className="small-note">対象テーブル: </label>
                <select
                    className="input"
                    value={entity}
                    onChange={(e) => {
                        setEntity(e.target.value);
                        setItems([]);
                        setSelectedId(null);
                        setPresetIndex(0);
                        setPayloadJson("");
                    }}
                >
                    {ENTITIES.map((ent) => (
                        <option key={ent.key} value={ent.key}>
                            {ent.label}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    className="button secondary"
                    onClick={mouseHandleFetch}
                    disabled={loading === "fetch"}
                >
                    {loading === "fetch" ? "読み込み中…" : "一覧取得"}
                </button>
            </div>

            <div className="form-row">
                <input
                    className="input"
                    placeholder="新規ID (省略可)"
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                />
                <input
                    className="input"
                    placeholder="名前 (省略可)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <button
                    type="button"
                    className="button primary"
                    onClick={handleCreate}
                    disabled={loading === "create"}
                >
                    {loading === "create" ? "作成中…" : "作成"}
                </button>
                <button
                    type="button"
                    className="button secondary"
                    onClick={handleCreateAuto}
                    disabled={loading === "createAuto"}
                >
                    {loading === "createAuto" ? "作成中…" : "自動作成"}
                </button>
            </div>

            <div style={{ marginBottom: 8 }}>
                <label>カスタム ペイロード（JSON、空欄なら自動生成）</label>
                <br />
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <select
                        value={presetIndex}
                        onChange={(e) =>
                            setPresetIndex(parseInt(e.target.value, 10))
                        }
                    >
                        <option value={0}>自動生成</option>
                        {(SAMPLE_PRESETS[entity] || []).map((p, idx) => (
                            <option key={idx + 1} value={idx + 1}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={() => {
                            const p = (SAMPLE_PRESETS[entity] || [])[
                                presetIndex - 1
                            ];
                            if (presetIndex === 0 || !p) {
                                setPayloadJson("");
                            } else {
                                setPayloadJson(
                                    JSON.stringify(p.payload, null, 2)
                                );
                            }
                        }}
                    >
                        プリセット読み込み
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            setPayloadJson(
                                JSON.stringify(
                                    defaultPayloadFor(entity),
                                    null,
                                    2
                                )
                            )
                        }
                    >
                        自動生成を表示
                    </button>
                </div>
                <textarea
                    className="payload-textarea"
                    value={payloadJson}
                    onChange={(e) => setPayloadJson(e.target.value)}
                    rows={6}
                />
            </div>

            <div className="form-row">
                <button
                    type="button"
                    className="button primary"
                    onClick={handleUpdate}
                    disabled={loading === "update"}
                >
                    {loading === "update" ? "更新中…" : "選択アイテムを更新"}
                </button>
                <button
                    type="button"
                    className="button secondary"
                    onClick={handleUpdateAuto}
                    disabled={loading === "updateAuto"}
                >
                    {loading === "updateAuto" ? "更新中…" : "自動更新"}
                </button>
                <span className="small-note">
                    選択ID: {selectedId ?? "(なし)"}
                </span>
            </div>
            <div className="form-row">
                <button
                    type="button"
                    className="button warn"
                    onClick={handleDeleteSelected}
                    disabled={loading === "deleteSelected"}
                >
                    {loading === "deleteSelected" ? "削除中…" : "選択を削除"}
                </button>
            </div>

            <div>
                {items.length === 0 ? (
                    <div>{entity} がロードされていません</div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    {Array.from(
                                        new Set(
                                            items.flatMap((it) =>
                                                Object.keys(it)
                                            )
                                        )
                                    ).map((k) => (
                                        <th key={k}>{k}</th>
                                    ))}
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((it) => (
                                    <tr
                                        key={it.id}
                                        className={
                                            selectedId === it.id
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() => setSelectedId(it.id)}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                e.preventDefault();
                                                setSelectedId(it.id);
                                            }
                                        }}
                                        role="button"
                                        tabIndex={0}
                                        aria-pressed={selectedId === it.id}
                                    >
                                        {Array.from(
                                            new Set(
                                                items.flatMap((it2) =>
                                                    Object.keys(it2)
                                                )
                                            )
                                        ).map((k) => (
                                            <td
                                                key={k}
                                                style={{
                                                    border: "1px solid #eee",
                                                    padding: 8,
                                                }}
                                            >
                                                {typeof it[k] === "object"
                                                    ? JSON.stringify(it[k])
                                                    : String(it[k] ?? "")}
                                            </td>
                                        ))}
                                        <td
                                            style={{
                                                border: "1px solid #eee",
                                                padding: 8,
                                            }}
                                        >
                                            <button
                                                type="button"
                                                className="button secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedId(it.id);
                                                }}
                                            >
                                                {selectedId === it.id
                                                    ? "選択済"
                                                    : "選択"}
                                            </button>
                                            <button
                                                type="button"
                                                className="button warn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(it.id);
                                                }}
                                                style={{ marginLeft: 6 }}
                                                disabled={
                                                    loading ===
                                                    `delete:${it.id}`
                                                }
                                            >
                                                {loading === `delete:${it.id}`
                                                    ? "削除中…"
                                                    : "削除"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div style={{ marginTop: 12 }}>
                <label>API レスポンス</label>
                <pre
                    aria-live="polite"
                    aria-atomic="true"
                    className="response-pre"
                >
                    {apiResult}
                </pre>
            </div>
        </div>
    );
};

export default SimpleApiDemo;
