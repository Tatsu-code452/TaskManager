// ダミーデータ
let masterData = {
    CATEGORY: ['開発', '設計', 'テスト'],
    PHASE: ['要件定義', '設計', '実装', 'テスト'],
    PROJECT: ['PJ-A', 'PJ-B'],
    USER: ['山田', '佐藤', '鈴木']
};

function renderList(type) {
    const ul = document.getElementById('masterList');
    ul.innerHTML = '';
    masterData[type].forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        ul.appendChild(li);
    });
}

document.getElementById('masterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = this.masterType.value;
    const name = this.name.value;
    if (!masterData[type].includes(name)) masterData[type].push(name);
    renderList(type);
    alert('登録/更新しました（ダミー）');
});

document.getElementById('deleteBtn').addEventListener('click', function() {
    const form = document.getElementById('masterForm');
    const type = form.masterType.value;
    const name = form.name.value;
    masterData[type] = masterData[type].filter(n => n !== name);
    renderList(type);
    alert('削除しました（ダミー）');
});

document.getElementById('masterForm').masterType.addEventListener('change', function() {
    renderList(this.value);
});

document.addEventListener('DOMContentLoaded', () => {
    renderList(document.getElementById('masterForm').masterType.value);
});
