// ダミーデータ
const tasks = [
    { startDate: '2025-06-01', endDate: '2025-06-05', workload: 8, priority: '高', category: '開発', assignee: '山田', progress: '50%', actualWorkload: 4 },
    { startDate: '2025-06-03', endDate: '2025-06-10', workload: 16, priority: '中', category: '設計', assignee: '佐藤', progress: '20%', actualWorkload: 3 },
    { startDate: '2025-06-02', endDate: '2025-06-07', workload: 12, priority: '低', category: 'テスト', assignee: '鈴木', progress: '80%', actualWorkload: 10 },
];

let currentSort = { key: null, asc: true };

document.addEventListener('DOMContentLoaded', () => {
    renderTable(tasks);
    document.getElementById('filterForm').addEventListener('submit', handleFilter);
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => handleSort(th.dataset.sort));
    });
});

function renderTable(data) {
    const tbody = document.querySelector('#taskTable tbody');
    tbody.innerHTML = '';
    data.forEach((task, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.startDate}</td>
            <td>${task.endDate}</td>
            <td>${task.workload}</td>
            <td>${task.priority}</td>
            <td>${task.category}</td>
            <td>${task.assignee}</td>
            <td>${task.progress}</td>
            <td><input type="number" min="0" value="${task.actualWorkload}" data-idx="${idx}" class="actual-input"></td>
        `;
        tbody.appendChild(tr);
    });
    document.querySelectorAll('.actual-input').forEach(input => {
        input.addEventListener('change', handleActualInput);
    });
}

function handleSort(key) {
    if (currentSort.key === key) {
        currentSort.asc = !currentSort.asc;
    } else {
        currentSort.key = key;
        currentSort.asc = true;
    }
    const sorted = [...tasks].sort((a, b) => {
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
    let filtered = tasks.filter(task => {
        if (fd.get('startDate') && task.startDate < fd.get('startDate')) return false;
        if (fd.get('endDate') && task.endDate > fd.get('endDate')) return false;
        if (fd.get('workload') && task.workload != fd.get('workload')) return false;
        if (fd.get('priority') && task.priority !== fd.get('priority')) return false;
        if (fd.get('category') && !task.category.includes(fd.get('category'))) return false;
        if (fd.get('assignee') && !task.assignee.includes(fd.get('assignee'))) return false;
        return true;
    });
    renderTable(filtered);
}

function handleActualInput(e) {
    const idx = e.target.dataset.idx;
    tasks[idx].actualWorkload = Number(e.target.value);
    // 実際のシステムではここでAPI等に保存処理を追加
}
