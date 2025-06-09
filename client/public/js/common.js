document.addEventListener("DOMContentLoaded", function () {
    loadCommonHeaderFooter();
});

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
        if (document.getElementById("screen-title-act")) {
            document.getElementById("screen-title").textContent =
                document.getElementById("screen-title-act").textContent;
        }
    });
    loadHtml("footer-area", "footer.html");
}

// 共通ヘッダー・フッターを動的に読み込む関数
function loadHtml(id, file, callback) {
    fetch(file)
        .then((res) => res.text())
        .then((html) => {
            document.getElementById(id).innerHTML = html;
            if (callback) callback();
        });
}

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