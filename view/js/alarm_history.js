// ダミーデータ
const alarms = [
    { date: '2025-06-01 10:00', type: 'エラー', assignee: '山田', content: 'タスクAの工数超過' },
    { date: '2025-06-02 14:30', type: '警告', assignee: '佐藤', content: 'タスクBの遅延' },
    { date: '2025-06-03 09:15', type: '通知', assignee: '鈴木', content: 'タスクCの完了' },
];

let currentSort = { key: null, asc: true };

document.addEventListener('DOMContentLoaded', () => {
    renderTable(alarms);
    document.getElementById('filterForm').addEventListener('submit', handleFilter);
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => handleSort(th.dataset.sort));
    });
});

function renderTable(data) {
    const tbody = document.querySelector('#alarmTable tbody');
    tbody.innerHTML = '';
    data.forEach((alarm) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${alarm.date}</td>
            <td>${alarm.type}</td>
            <td>${alarm.assignee}</td>
            <td>${alarm.content}</td>
        `;
        tbody.appendChild(tr);
    });
}

function handleSort(key) {
    if (currentSort.key === key) {
        currentSort.asc = !currentSort.asc;
    } else {
        currentSort.key = key;
        currentSort.asc = true;
    }
    const sorted = [...alarms].sort((a, b) => {
        if (a[key] < b[key]) return currentSort.asc ? -1 : 1;
        if (a[key] > b[key]) return currentSort.asc ? 1 : -1;
        return 0;
    });
    renderTable(sorted);
}

function handleFilter(e) {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    let filtered = alarms.filter(alarm => {
        if (fd.get('date') && !alarm.date.startsWith(fd.get('date'))) return false;
        if (fd.get('type') && !alarm.type.includes(fd.get('type'))) return false;
        if (fd.get('assignee') && !alarm.assignee.includes(fd.get('assignee'))) return false;
        return true;
    });
    renderTable(filtered);
}
