// 日付入力用のフォーマット変換
export function formatToDateInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * 日付フォーマット
 */
export function formatDate(date, withTime = false) {
    if (!date) return "";
    const d = new Date(date);
    return withTime ? d.toLocaleString() : d.toLocaleDateString();
}
