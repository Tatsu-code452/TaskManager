// タスク詳細画面のダミー実装
// 本来はAPI連携や親画面からのデータ受け渡しが必要

document.getElementById('taskDetailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('タスクを登録/更新しました（ダミー）');
    // 実際はここでAPI送信や画面遷移処理
});

document.getElementById('deleteBtn').addEventListener('click', function() {
    if (confirm('本当に削除しますか？')) {
        alert('タスクを削除しました（ダミー）');
        // 実際はここでAPI送信や画面遷移処理
    }
});
