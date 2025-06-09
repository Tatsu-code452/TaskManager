// ダミーのエクセルアップロード処理
// 実際はファイル解析やサーバー連携が必要

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('mappingSection').style.display = 'block';
    alert('アップロード処理（ダミー）\n列-項目紐づけ画面を表示します。');
});

document.getElementById('registerBtn').addEventListener('click', function() {
    alert('一括タスク登録処理（ダミー）');
});
