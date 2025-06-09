document.addEventListener("DOMContentLoaded", function () {
    // header-area, footer-areaをbody直下に自動生成
    if (!document.getElementById("header-area")) {
        const headerDiv = document.createElement("div");
        headerDiv.id = "header-area";
        document.body.insertBefore(headerDiv, document.body.firstChild);
    }
    if (!document.getElementById("footer-area")) {
        const footerDiv = document.createElement("div");
        footerDiv.id = "footer-area";
        document.body.appendChild(footerDiv);
    }
    loadCommonHeaderFooter();
});

// 共通ヘッダー・フッターを動的に読み込む関数
function loadHtml(id, file, callback) {
    fetch(file)
        .then((res) => res.text())
        .then((html) => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        });
}
// ヘッダー・フッターを読み込む共通関数
function loadCommonHeaderFooter() {
    loadHtml("header-area", "header.html", function () {
        // ヘッダー挿入後に日時表示も初期化
        if (document.getElementById("current-datetime")) {
            updateDateTime();
            if (!window._dtimer) {
                window._dtimer = setInterval(updateDateTime, 1000);
            }
        }
    });
    loadHtml("footer-area", "footer.html");
}

// ヘッダー・フッター共通読み込み・画面名設定
window.addEventListener('DOMContentLoaded', () => {
    // ヘッダー読み込み
    const headerContainer = document.getElementById('header-area');
    if (headerContainer) {
        fetch('header.html')
            .then(res => res.text())
            .then(html => {
                headerContainer.innerHTML = html;
                // 画面名を設定
                const titleMap = {
                    'index.html': 'メニュー',
                    'task.html': 'タスク一覧',
                    'task_detail.html': 'タスク詳細',
                    'effort_list.html': '工数予実一覧',
                    'gantt.html': 'ガントチャート',
                    'alarm_history.html': 'アラーム履歴',
                    'master_edit.html': 'マスタ修正',
                    'excel_download.html': 'エクセルダウンロード',
                    'excel_upload.html': 'エクセルアップロード'
                };
                const path = location.pathname.split('/').pop();
                const screenTitle = titleMap[path] || document.title;
                const titleElem = document.getElementById('screen-title');
                if (titleElem) titleElem.textContent = screenTitle;
                // 日時表示
                const dtElem = document.getElementById('current-datetime');
                if (dtElem) {
                    const now = new Date();
                    dtElem.textContent = now.toLocaleString('ja-JP');
                }
            });
    }
    // フッター読み込み
    const footerContainer = document.getElementById('footer-area');
    if (footerContainer) {
        fetch('footer.html')
            .then(res => res.text())
            .then(html => {
                footerContainer.innerHTML = html;
            });
    }
});

function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const el = document.getElementById("current-datetime");
    if (el) el.textContent = formattedDate;
}