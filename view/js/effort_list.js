// ダミーデータ
const efforts = [
    { startDate: '2025-06-01', endDate: '2025-06-05', workload: 8, actualWorkload: 7, priority: '高', category: '開発', assignee: '山田' },
    { startDate: '2025-06-03', endDate: '2025-06-10', workload: 16, actualWorkload: 15, priority: '中', category: '設計', assignee: '佐藤' },
    { startDate: '2025-06-02', endDate: '2025-06-07', workload: 12, actualWorkload: 13, priority: '低', category: 'テスト', assignee: '鈴木' },
];

let currentSort = { key: null, asc: true };

document.addEventListener('DOMContentLoaded', () => {
    renderTable(efforts);
    document.getElementById('filterForm').addEventListener('submit', handleFilter);
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => handleSort(th.dataset.sort));
    });
});

function renderTable(data) {
    const tbody = document.querySelector('#effortTable tbody');
    tbody.innerHTML = '';
    data.forEach((effort) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${effort.startDate}</td>
            <td>${effort.endDate}</td>
            <td>${effort.workload}</td>
            <td>${effort.actualWorkload}</td>
            <td>${effort.priority}</td>
            <td>${effort.category}</td>
            <td>${effort.assignee}</td>
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
    const sorted = [...efforts].sort((a, b) => {
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
    let filtered = efforts.filter(effort => {
        if (fd.get('startDate') && effort.startDate < fd.get('startDate')) return false;
        if (fd.get('endDate') && effort.endDate > fd.get('endDate')) return false;
        if (fd.get('workload') && effort.workload != fd.get('workload')) return false;
        if (fd.get('priority') && effort.priority !== fd.get('priority')) return false;
        if (fd.get('category') && !effort.category.includes(fd.get('category'))) return false;
        if (fd.get('assignee') && !effort.assignee.includes(fd.get('assignee'))) return false;
        return true;
    });
    renderTable(filtered);
}
