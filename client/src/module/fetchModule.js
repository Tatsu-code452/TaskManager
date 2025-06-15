// fetchModule.js
// fetchや日付フォーマットなどの共通ユーティリティをESM形式で整理

/**
 * API通信ユーティリティ
 */
export async function fetchApi(action, url, data = null) {
    try {
        const headers = { "Content-Type": "application/json" };
        let body = null;
        if (!data) {
            body = null;
        } else if (data instanceof FormData) {
            body = data;
            // FormDataの場合はContent-Type自動設定なので削除
            delete headers["Content-Type"];
        } else if (typeof data === "object") {
            body = JSON.stringify(data);
        } else if (typeof data === "string") {
            body = data;
        } else {
            throw new Error("不正なデータ形式: " + typeof data);
        }
        const response = await fetch(url, {
            method: action,
            headers,
            credentials: "include",
            body,
        });
        if (!response.ok) {
            throw new Error("ネットワークエラー: " + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error("通信エラー:", error);
        throw error;
    }
}

export async function fetchApiWithLock(action, url, data = null) {
    screenLock();
    try {
        const result = await fetchApi(action, url, data);
        return result;
    } catch (error) {
        console.error("API通信エラー:", error);
        throw error;
    } finally {
        screenUnlock();
    }
}

export function screenLock() {
    if (!document.getElementById("screenLock")) {
        const lockScreen = document.createElement("div");
        lockScreen.id = "screenLock";
        lockScreen.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.5); z-index: 9999;
            pointer-events: none;`;
        document.body.appendChild(lockScreen);
    }
}

export function screenUnlock() {
    document.getElementById("screenLock")?.remove();
}

/**
 * 日付フォーマット
 */
export function formatDate(date, withTime = false) {
    if (!date) return "";
    const d = new Date(date);
    return withTime ? d.toLocaleString() : d.toLocaleDateString();
}
